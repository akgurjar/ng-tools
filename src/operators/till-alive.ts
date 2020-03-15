import { Subscriber, Observable, Operator, TeardownLogic, MonoTypeOperatorFunction } from 'rxjs';

interface OnDestroy {
    ngOnDestroy(): void;
}

class TillAliveSubscriber<T> extends Subscriber<T> {
    constructor(destination: Subscriber<T>, target: OnDestroy) {
        super(destination);
        const ngOnDestroy = target.ngOnDestroy;
        target.ngOnDestroy = function() {
            destination.complete();
            if (ngOnDestroy) {
                ngOnDestroy.call(this);
            }
        };
    }
}

class TillAliveOperator<T> implements Operator<T, T> {
    constructor(public target: OnDestroy) {}
    call(subscriber: Subscriber<T>, source: any): TeardownLogic {
        return source.subscribe(new TillAliveSubscriber(subscriber, this.target));
    }
}

export function tillAlive<T>(target: { ngOnDestroy: () => void }): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => {
        return source.lift(new TillAliveOperator<T>(target));
    };
}