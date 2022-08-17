import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { delay, filter, scan } from 'rxjs';
import { EqualityValidators } from '../equality-validators';

@Component({
  selector: 'app-equality',
  templateUrl: './equality.component.html',
  styleUrls: ['./equality.component.css']
})
export class EqualityComponent implements OnInit {

  seconds = 0

  mathForm = new FormGroup(
    {
      firstNumber : new FormControl(this.generateNumber()),
      secondNumber : new FormControl(this.generateNumber()),
      answer : new FormControl('')
    },
    [EqualityValidators.addition('answer', 'firstNumber', 'secondNumber')]
  )

  get firstNumber() {
    return this.mathForm.value.firstNumber
  }

  get secondNumber() {
    return this.mathForm.value.secondNumber
  }

  constructor() { }

  ngOnInit(): void {

    let startTime = new Date()

    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(800),
    ).
    subscribe(() => {
      this.seconds = (new Date().getTime() - startTime.getTime()) / 1000
      this.mathForm.setValue(
        {
          firstNumber : this.generateNumber(),
          secondNumber : this.generateNumber(),
          answer : ''
        }
      )
      startTime = new Date()
    })
  }

  generateNumber() {
    return Math.floor(Math.random()*100)
  }

}
