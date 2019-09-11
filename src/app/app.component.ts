import { Component, OnInit } from '@angular/core';
import { Car } from './domain/car';
import { CarService } from './services/carservice';

export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) {}
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [CarService]
})
export class AppComponent implements OnInit {

    cars1: Car[];

    cars2: Car[];

    brands = [];

    clonedCars: { [s: string]: Car; } = {};

    cars: Car[];

    cols: any[];
    selectedCar1: Car;

    selectedCar2: Car;

    selectedCar3: Car;

    selectedCar4: Car;

    selectedCars1: Car[];
    editing:any;

    selectedCars2: Car[];

    selectedCars3: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars1 = cars);
        this.carService.getCarsSmall().then(cars => this.cars2 = cars);
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.brands = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }

    onRowEditInit(car: Car) {
        console.log(car);
        this.clonedCars[car.vin] = {...car};
    }

    onRowEditSave(car: Car) {
        // if (car.year > 0) {
        //     delete this.clonedCars[car.vin];
        //     this.messageService.add({severity:'success', summary: 'Success', detail:'Car is updated'});
        // }
        // else {
        //     this.messageService.add({severity:'error', summary: 'Error', detail:'Year is required'});
        // }
    }

    onEditAll() {
        this.cars2.forEach((value, key) => {
            this.cars2[0]['isEditable'] = true;
        });
    }

    selectCarWithButton(car: Car) {
       
        this.selectedCar2 = car;
        // this.messageService.add({severity:'info', summary:'Car Selected', detail:'Vin: ' + car.vin});
    }

    onRowSelect(event) {
        // this.messageService.add({severity:'info', summary:'Car Selected', detail:'Vin: ' + event.data.vin});
    }

    onRowUnselect(event) {
        // this.messageService.add({severity:'info', summary:'Car Unselected', detail:'Vin: ' + event.data.vin});
    }

    onRowEditCancel(car: Car, index: number) {
        this.cars2[index] = this.clonedCars[car.vin];
        delete this.clonedCars[car.vin];
    }

}
