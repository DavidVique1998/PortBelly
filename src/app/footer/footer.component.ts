import { Component, OnInit } from '@angular/core';
import {faEnvelopeOpenText,faMapMarkedAlt,faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faEnvelopeOpenText = faEnvelopeOpenText;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhoneAlt = faPhoneAlt;
  constructor() { }

  ngOnInit(): void {
  }

}
