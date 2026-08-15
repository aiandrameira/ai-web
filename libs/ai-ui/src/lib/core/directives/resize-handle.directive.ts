import { Directive, input, model, output, signal } from "@angular/core";

@Directive({
    selector: "[aiResizeHandle]",
    exportAs: "aiResizeHandle",
    host: {
        "(mousedown)": "onPointerDown($event)",
        "(touchstart)": "onPointerDown($event)",
    },
})
export class AiResizeHandle {
    readonly width = model.required<number>();
    readonly min = input(0);
    readonly max = input(Infinity);
    readonly axis = input<"x" | "y">("x");

    readonly resizeStart = output<void>();
    readonly resizeEnd = output<void>();

    readonly resizing = signal(false);

    protected onPointerDown(event: MouseEvent | TouchEvent): void {
        event.preventDefault();
        this.resizing.set(true);
        this.resizeStart.emit();

        const onMove = (moveEvent: MouseEvent | TouchEvent) => {
            const point = "touches" in moveEvent ? moveEvent.touches[0] : moveEvent;
            if (!point) return;

            const value = this.axis() === "x" ? point.clientX : point.clientY;
            this.width.set(Math.min(this.max(), Math.max(this.min(), value)));
        };

        const onUp = () => {
            this.resizing.set(false);
            this.resizeEnd.emit();
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("touchmove", onMove);
            document.removeEventListener("mouseup", onUp);
            document.removeEventListener("touchend", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("mouseup", onUp);
        document.addEventListener("touchend", onUp);
    }
}
