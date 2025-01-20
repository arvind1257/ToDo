
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Automatically registers the service in the root injector
})
export class CentralDataService {
  private sharedData = new BehaviorSubject<Object>({});

  sharedData$: Observable<Object> = this.sharedData.asObservable();

  updateData(newValue: Object): void {
      this.sharedData.next(newValue); // Update with the passed value
  }
}
