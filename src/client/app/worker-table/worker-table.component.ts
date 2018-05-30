import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-worker-table',
  templateUrl: './worker-table.component.html',
  styleUrls: ['./worker-table.component.css']
})
export class WorkerTableComponent implements OnInit {

  workers: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWorkers();
  }

  kill(i) {
    const pid = {pid: this.workers[i].pid};
    this.http.post('api/process', pid).subscribe(data => {
      alert(`Process ${pid.pid} terminated`);
      this.getWorkers();
    });
  }

  getWorkers() {
    this.http.get('api/process').subscribe((data: any[]) => {
      console.log(data);

      this.workers = data;
    });
  }

}
