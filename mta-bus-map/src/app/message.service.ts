import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private selectedFeature = new Subject<string>();

    updateSelectedFeature(featureId: string) {
        this.selectedFeature.next(featureId);
    }

    getSelectedFeature(): Observable<string> {
        return this.selectedFeature.asObservable();
    }


}
