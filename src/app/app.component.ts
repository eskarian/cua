import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandService } from './command.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  result: string;
  constructor(
    private fb: FormBuilder,
    public commandService: CommandService) {}

  ngOnInit() {
    this.form = this.fb.group({
      command: ['', [Validators.required, this.commandService.validateCommand]]
    })
  }

  submit() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.result = this.commandService.submit(this.form.value.command);
    }
  }

  dirtyAndInvalid(controlName: string) {
    return this.form.get(controlName).dirty && this.form.get(controlName).invalid;
  }

  getErrorMessage(controlName: string) {
    return this.commandService.getValidatorErrorMessage(Object.keys(this.form.get(controlName).errors)[0]);
  }
}
