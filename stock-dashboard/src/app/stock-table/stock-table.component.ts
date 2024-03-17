import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../stock.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['symbol', 'ltp', 'stockMomentumRank', 'open', 'openHighLowSignal', 'change'];
  dataSource = new MatTableDataSource<Stock>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.fetchStocks();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  fetchStocks(): void {
    this.stockService.getStocks()
      .subscribe(
        stocks => {
          console.log('Fetched stocks:', stocks);
          const mappedStocks: Stock[] = stocks.map((stockData: any) => {
            console.log('Intraday Scans for', stockData.symbol + ':', stockData.allScans.intradayScans);
            return {
              symbol: stockData.symbol,
              ltp: stockData.ltp,
              stockMomentumRank: stockData.stockMomentumRank,
              stockOutperformanceRank: stockData.stockOutperformanceRank,
              open: stockData.open,
              low: stockData.low,
              high: stockData.high,
              openHighLowSignal: stockData.openHighLowSignal,
              intradayScans: stockData.allScans?.intradayScans,
              change: stockData.change
            };
          });
          this.dataSource.data = mappedStocks;
        },
        error => {
          console.error('Error fetching stocks:', error);
        }
      );
  }

  getLTPColor(change: number): string {
    return change > 0 ? 'green' : change < 0 ? 'red' : 'black';
  }
}
