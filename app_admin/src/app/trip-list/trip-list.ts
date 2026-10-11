import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Trip } from '../trip';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList implements OnInit {
  trips: Trip[] = [];

  private tripData = inject(TripData);
private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('TripList component initialized');

    this.tripData.getTrips().subscribe({
      next: (data: Trip[]) => {
        console.log('Trips received:', data);
        this.trips = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error retrieving trips:', error);
      }
    });
  }
}