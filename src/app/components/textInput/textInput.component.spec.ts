/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { TextInputComponent } from './textInput.component'

describe('TextInputComponent', () => {
  let component: TextInputComponent
  let fixture: ComponentFixture<TextInputComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextInputComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
