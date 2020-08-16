import { TestBed } from '@angular/core/testing';

import { CommandService } from './command.service';

describe('CommandService', () => {
  let service: CommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#submit() should return HEX string', () => {
    const result = service.submit('PLPLPLPLPLPLPLPLPLPL');
    expect(result).toBe('A000000000', 'expect to be A000000000');
    const result2 = service.submit('PMLPMMMLPMLPMML');
    expect(result2).toBe('0211000000', 'expect to be 0211000000');
  })

  it('#getValidatorErrorMessage() should return correct messages', () => {
    const result = service.getValidatorErrorMessage('required');
    expect(result).toEqual('Field Required', 'required to show Field Required');
    const result2 = service.getValidatorErrorMessage('invalidCommand');
    expect(result2).toEqual('Allowed commands: P, M, L', 'invalidCommand to show Allowed Commands');
  })

  it('#validateCommand() should return correct messages', () => {
    const result = service.validateCommand({value: 'PLPLPLPLPLPLPLPLPLPL'});
    expect(result).toEqual(null, 'no errors');
    const result2 = service.validateCommand({value: 'PMLPMMMLPMLPMML'});
    expect(result2).toEqual(null, 'no errors');
    const result3 = service.validateCommand({value: ''});
    expect(result3).toEqual(null, 'no errors');
    const result4 = service.validateCommand({value: 'PMLPMMMLSAPMLPMML'});
    expect(result4).toEqual({ invalidCommand: true }, 'no errors');
  })
});
