import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private validResult = null;
  constructor() { }

  submit(command: string): string {
    const cleanCommand = command.toLocaleLowerCase().replace(/[^pml]+/g, '');
    const finalPositions = this.getPositions(cleanCommand);
    return this.positionsToString(finalPositions);
  }

  private generateInitArray(length: number): number[] {
    return [...Array(length)].fill(0);
  }

  private getPositions(cleanCommand: string): number[] {
    let positions = this.generateInitArray(10);
    let pos = 0;
    let hasBlock = false;
    for (const c of cleanCommand) {
      if (c === 'p') {
        pos = 0;
        hasBlock = true;
      }
      else if (c === 'm') {
        pos <= 9 ? pos++ : pos;
      }
      else if (c === 'l' && hasBlock) {
        positions[pos] <= 15 ? positions[pos]++ : positions[pos];
        hasBlock = false;
      }
    }
    return positions;
  }

  private positionsToString(positions: number[]): string {
    return positions.reduce((prev, p) => prev + p.toString(16).toLocaleUpperCase(), '');
  }

  // VALIDATION
  getValidatorErrorMessage(validatorName: string) {
    const config = {
      'required': 'Field Required',
      'invalidCommand': 'Allowed commands: P, M, L'
    };

    return config[validatorName];
  }

  validateCommand = ({value}) => {
    if(value && /[^pml]/g.test(value.toLocaleLowerCase())){
      return { 'invalidCommand': true }
    }
    return this.validResult;
  }
}
