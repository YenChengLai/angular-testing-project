import { DataService } from './../shared/data.service';
import { UserService } from './user.service';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use user name from the service', () => {
    fixture = TestBed.createComponent(UserComponent);
    const userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges(); // trigger the change detection;
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display the user name if the user is logged in', () => {
    fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    app.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  });

  it('shouldn\'t display the user name if the user isn\'t logged in', () => {
    fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
  });

  it('shouldn\'t fetch data successfully if not called asynchronously', () => {
    fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(app.data).toBe(undefined);
  });

  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick(); // tick means finish all asynchronous task now in a fake async environment.
    expect(app.data).toBe('Data');
  }));
});
