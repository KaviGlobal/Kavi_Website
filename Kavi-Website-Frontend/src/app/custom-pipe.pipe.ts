import { Injectable, Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'customPipe'
})
@Injectable()
export class CustomPipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

    transform (value: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }

}
