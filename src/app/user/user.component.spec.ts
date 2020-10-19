import { UserService } from './user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
});
