import { Directive, ElementRef, Input } from '@angular/core';

@Directive()
export abstract class ControlsSharedInputs {
	@Input({ required: true }) previousOffsetRef!: ElementRef<number>;
	@Input({ required: true }) onChangeOffset!: (offset: number) => void;
}
