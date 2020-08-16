import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommandService } from './command.service';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fb: FormBuilder;
  let commandService: CommandService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        CommandService,
        AppComponent
      ]
    }).compileComponents();
    
    comp = TestBed.inject(AppComponent);
    fb = TestBed.inject(FormBuilder);
    commandService = TestBed.inject(CommandService);
  }));

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('cua app is running!');
  // });
  it('#ngOnInit() should populate form', () => {
    comp.ngOnInit();
    expect(comp.form).toBeTruthy();
  })

  it('#submit() should populate result with HEX string', () => {
    comp.ngOnInit();
    comp.form.get('command').setValue('PLPLPLPLPLPLPLPLPLPL');
    comp.submit();
    expect(comp.result).toBe('A000000000', 'expect to be A000000000');
    
    comp.form.get('command').setValue('PMLPMMMLPMLPMML');
    comp.submit();
    expect(comp.result).toBe('0211000000', 'expect to be 0211000000');
  })

  it('#dirtyAndInvalid() should return true or false', () => {
    comp.ngOnInit();
    comp.form.get('command').setValue('PLPLPLPLPLPLPLPLPLPL');
    comp.form.get('command').markAsDirty();
    expect(comp.dirtyAndInvalid('command')).toBeFalse();
    
    comp.form.get('command').setValue('SALPMML');
    comp.form.get('command').markAsDirty();
    expect(comp.dirtyAndInvalid('command')).toBeTrue();
  })
  
  it('#form and #result should be undefined initially', () => {
    expect(comp.form).toBeUndefined();
    expect(comp.result).toBeUndefined();
  })
});
