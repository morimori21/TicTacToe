import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayAreaPage } from './play-area.page';

describe('PlayAreaPage', () => {
  let component: PlayAreaPage;
  let fixture: ComponentFixture<PlayAreaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
