@charset "UTF-8";





html {
  font-family: 'Lato', sans-serif;
  margin: 0;
}

body {
  margin: 0;
}

.text-small {
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
}

h5, .h5 {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}

.text-dark-gray {
  color: #767676;
}

.text-bold {
  font-weight: bold !important;
}

.cds-userpic {
  display: -ms-inline-flexbox;
  display: inline-flex;
  border-radius: 50%;
  overflow: hidden;
  width: 24px;
  height: 24px;
}

.cds-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 12px;
  line-height: 16px;
  color: #2a2a2a;
}

.cds-table td {
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin: 0;
  box-sizing: border-box;
  padding: 0 8px;
}

.cds-table td > * {
  vertical-align: middle;
}

.cds-table td .cds-userpic {
  margin-right: 4px;
}

.cds-table thead {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
}

.cds-table thead td {
  height: 24px;
}

.cds-table tbody td {
  height: 40px;
}

.cds-table tbody tr {
  transition: .3s;
}

.cds-table tbody tr:hover {
  background: rgba(0,0,0,0.1);
}

.cds-table-wrapper {
  margin-bottom: 28px;
  width: 100%;
}

.cds-input {
  position: relative;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: .3s;
}

.cds-input > .icn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.cds-input:focus-within {
  border: 1px solid #767676;
}

.cds-form-control {
  background: #ffffff!important;
  border: 1px solid rgba(0,0,0,0.1);
  box-sizing: border-box;
  border-radius: 2px;
  height: 28px !important;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
      align-items: center;
  padding: 6px 28px 6px 12px;
  font-size: 12px;
  line-height: 16px;
  outline: none;
  transition: .3s;
}

.cds-form-control :-ms-input-placeholder {
  color: #2a2a2a;
  opacity: 0.5;
}

.cds-form-control ::placeholder {
  color: #2a2a2a;
  opacity: 0.5;
}

.cds-form-control:hover {
  border: 1px solid #4a4a4a;
}

.cds-form-control:focus {
  border: 1px solid #767676;
}

/* clears the 'X' from Internet Explorer */
input[type=search]::-ms-clear,
input[type=search]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

/* clears the 'X' from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}

.cds-btn {
  background: transparent;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: center;
      justify-content: center;
  cursor: pointer;
  transition: .3s;
}

.cds-btn--icon {
  width: 24px;
  height: 24px;
  font-size: 21px;
  line-height: 1;
  border-radius: 2px;
  color: #2a2a2a;
}

.cds-btn--icon .icn {
  font-size: 21px;
  line-height: 1;
  color: #2a2a2a;
}

.cds-btn--icon img {
  width: 100%;
  max-height: 100%;
}

.cds-btn--icon:hover {
  background: rgba(66,73,88,0.1);
}

.cds-link {
  color: #2a2a2a!important;
  text-decoration: underline!important;
}

.cds-link:hover {
  text-decoration: none!important;
}

.cds-dashboard {
  overflow: hidden;
  background-color: rgba(66,73,88,0.1);
}

.cds-cards-dashboard {
  padding: 16px 12px;
}

.cds-cards-row > * {
  margin-bottom: 16px;
}

.cds-card {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
      flex-direction: column;
  -ms-flex-align: start;
      align-items: flex-start;
  -ms-flex-pack: justify;
      justify-content: space-between;
  border: 1px solid rgba(0,0,0,0.1);
  box-sizing: border-box;
  border-radius: 4px;
  height: 100%;
  text-decoration: none;
  color: #2a2a2a;
  background-color: #ffffff;
}

.cds-card * {
  box-sizing: border-box;
}

.cds-card-add {
  position: relative;
}

.cds-card--sm {
  min-height: 62px;
}

.cds-card--md {
  min-height: 140px;
}

.cds-card--lg {
  min-height: 296px;
}

.cds-card__minwidth.col-12 {
  min-width: calc(1808px + 16px);
}

.cds-card__minwidth.col-11 {
  min-width: calc(1656px + 16px);
}

.cds-card__minwidth.col-10 {
  min-width: calc(1504px + 16px);
}

.cds-card__minwidth.col-9 {
  min-width: calc(1352px + 16px);
}

.cds-card__minwidth.col-8 {
  min-width: calc(1200px + 16px);
}

.cds-card__minwidth.col-7 {
  min-width: calc(1048px + 16px);
}

.cds-card__minwidth.col-6 {
  min-width: calc(896px + 16px);
}

.cds-card__minwidth.col-5 {
  min-width: calc(744px + 16px);
}

.cds-card__minwidth.col-4 {
  min-width: calc(592px + 16px);
}

.cds-card__minwidth.col-3 {
  min-width: calc(440px + 16px);
}

.cds-card__minwidth.col-2 {
  min-width: calc(288px + 16px);
}

.cds-card__minwidth.col-1 {
  min-width: calc(136px + 16px);
}

.cds-card__header {
  padding: 12px 16px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: justify;
      justify-content: space-between;
  min-height: 44px;
  width: 100%;
}
.cds-card__actions {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
}

.cds-card__actions a {
  text-decoration: none;
}

.cds-card__actions > *:not(:last-child) {
  margin-right: 12px;
}

.cds-card__title {
  font-size: 14px;
  line-height: 20px;
  color: #2a2a2a;
  font-weight: normal;
}

.cds-card__body {
  padding: 0 16px 12px 16px;
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -ms-flex-direction: row;
      flex-direction: row;
  color: #2a2a2a;
}

.cds-card__body > .row {
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
}

.cds-card__body .row + .row {
  margin-top: 16px;
}

.cds-card__info {
  height: 100%;
  -ms-flex: 1;
      flex: 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
      flex-direction: column;
  -ms-flex-pack: end;
      justify-content: end;
  transition: .3s;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 8px 8px 4px;
  margin-right: 16px;
  margin-left: -8px;
}

.cds-card__info .cds-card__info {
  padding: 0;
  margin: 0!important;
}

.cds-card__info .cds-card__info:first-child {
  margin-right: 16px!important;
}

.cds-card__info[data-size="2"] { flex: 2; }
.cds-card__info[data-size="3"] { flex: 3; }
.cds-card__info[data-size="4"] { flex: 4; }
.cds-card__info[data-size="5"] { flex: 5; }
.cds-card__info[data-size="6"] { flex: 6; }
.cds-card__info[data-size="12"] { flex: 12; }

A.cds-card__info {
  color: #2a2a2a;
}

.cds-card__info:last-child {
  margin-right: -8px;
}

.cds-card__info:hover {
  background-color: rgba(66,73,88,0.1);
  border-color: rgba(0,0,0,0.1);
}

.cds-card__plus {
  position: absolute;
  z-index: 2;
  right: 24px;
  bottom: 16px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
}

.cds-card__plus:hover {
  border: 1px solid rgba(0,0,0,0.1);
}

.cds-card__subtitle {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #767676;
}

.cds-card__bullet {
  display: -ms-inline-flexbox;
  display: inline-flex;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}

.cds-card__value {
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  color: #2a2a2a;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
}

.cds-card__value--inactive {
  opacity: 0.5;
}

.cds-card__value--large {
  font-size: 32px;
}

.cds-card--single {
  transition: .3s;
  cursor: pointer;
  position: relative;
}

.cds-card--single:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #ffffff;
}

.cds-card--single .cds-card__body {
  padding: 0 16px 12px 16px;
}

.cds-card--single .cds-card__info {
  background: transparent;
  border: none;
}

.cds-card--single:hover {
  background-color: rgba(66,73,88,0.1);
}

.cds-card--top .cds-card__body {
  height: 100%;
  overflow: scroll;
}

.cds-tile {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
      flex-direction: row;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: start;
      justify-content: flex-start;
  border: 1px solid rgba(0,0,0,0.1);
  box-sizing: border-box;
  border-radius: 4px;
  height: 62px;
  padding: 12px;
  text-decoration: none;
  background-color: #ffffff;
  color: #2a2a2a;
  position: relative;
  transition: .3s;
}

.cds-tile:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #ffffff;
}

.cds-tile:hover {
  background-color: rgba(66,73,88,0.1);
  
}

.cds-tile__icon {
  margin-right: 8px;
  font-size: 32px;
}

.cds-tile__title {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin-right: 8px;
}

.cds-tile__value {
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  justify-self: flex-end;
  margin-left: auto;
}

.cds-card-tiles {
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -ms-flex-direction: column;
      flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
}

.cds-card-tiles__item {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -ms-flex-direction: row;
      flex-direction: row;
  padding: 8px 12px;
  background: rgba(66,73,88,0.1);
  border-radius: 4px;
  min-height: 32px;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #2a2a2a;
  margin-bottom: 4px;
  text-decoration: none;
  outline: none;
  transition: .3s;
}

.cds-card-tiles__item > .icn,
.cds-card-tiles__item > .ci,
.cds-card-tiles__item > .fa,
.cds-card-tiles__item > .im {
  font-size: 16px;
  color: #2a2a2a;
  margin-right: 6px;
}

.cds-card-tiles__item:last-child {
  margin-bottom: 0;
}

.cds-card-tiles__item:after {
  content: "\e927";
  font-family: "iCoins";
  justify-self: flex-end;
  margin-left: auto;
  font-weight: bold;
  font-size: 18px;
  opacity: 0;
  transition: .3s;
}

.cds-card-tiles__item:hover {
  background: rgba(0,0,0,0.1);
}

.cds-card-tiles__item:hover:after {
  opacity: 1;
}

.cds-tabs {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: #ffffff;
}

.cds-tabs__btn {
  display: -ms-inline-flexbox;
  display: inline-flex;
  height: 28px;
  padding: 0 8px;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: center;
      justify-content: center;
  border-radius: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #767676;
  transition: .3s;
}

.cds-tabs__btn.is-active {
  background-color: rgba(66,73,88,0.1);
  color: #2a2a2a;
}

.cds-tabcontent {
  padding: 16px 20px;
  position: relative;
  overflow: auto;
  height: calc(100% - 32px);
}

.ui-layout-pane {
  background-color: #ffffff;
}

.cds-tabcontent__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  opacity: .3;
  z-index: 1;
}

body.mode-dark .cds-tabcontent__bg {
  opacity: .1;
}

.cds-tabcontent__bg ~ * {
  position: relative;
  z-index: 2;
}

.cds-accordion:not(:first-child) {
  margin-top: -1px;
}

.cds-accordion__head {
  background-color: rgba(66,73,88,0.1);
  color: #2a2a2a;
  cursor: pointer;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
      flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -ms-flex-align: center;
      align-items: center;
  width: 100%;
  height: 40px;
  outline: none;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  border-top: 1px solid rgba(0,0,0,0.1);
  transition: .3s;
}

.cds-accordion__head:first-child {
  border-top: 1px solid rgba(0,0,0,0.1);
}

.cds-accordion__head > .icn {
  font-size: 24px;
  transition: .3s;
}

.cds-accordion__head.is-active {
  border-color: transparent;
  background: transparent;
}

.cds-accordion__head.is-active > .icn {
  transform: rotate(90deg);
}

.cds-accordion__body {
  background-color: transparent;
  max-height: 0;
  overflow: hidden;
  transition: .3s;
}

.cds-accordion__body.is-active {
  max-height: unset;
  padding-bottom: 20px;
}

/* c3 charts  */

.c3 {
  max-width: 100%;
}

.c3 .tick text {
  /* fill: rgba(74, 74, 74, 0.7); */
  fill: #767676;
}

.c3 .c3-grid line {
  /* stroke: rgba(0, 0, 0, 0.1); */
  stroke: rgba(0,0,0,0.1);
  stroke-dasharray: 0;
}

.c3 .c3-line {
  stroke-width: 2px;
}

.c3 .c3-chart-lines circle {
  /* fill: #ffffff; */
  fill: #ffffff;
  stroke-width: 2px !important;
  stroke: currentColor !important;
}

.c3-legend-item text {
  /* fill: rgba(74, 74, 74, 0.7); */
  fill: #767676;
}

.c3-legend-item-tile {
  shape-rendering: auto;
  stroke-linecap: round;
  stroke-dasharray: 0.1 10;
  stroke-width: 10;
  transform: translate(6px, 1px);
}

.c3-tooltip-container {
  border-radius: 4px;
  overflow: hidden;
}

.c3-tooltip-container .c3-tooltip th {
  background: rgba(66,73,88,0.1);
  color: inherit;
}

.c3-tooltip-container .c3-tooltip td {
  border-left: none;
}

.c3-tooltip-container .c3-tooltip td > span {
  border-radius: 5px;
}

.c3-axis .tick line,
.c3-axis path.domain {
  display: none;
}

.c3-axis-x-label,
.c3-axis-y-label {
  fill: #2a2a2a;
}

iframe.inlinetile {
  border: 1px solid rgba(0,0,0,0.1);
}

.cds-circle-icon {
  display: -ms-flexbox;
  display: flex;  
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  margin-right: 16px;
  border-radius: 25px;
  background: #e54d42;
  color: #ffffff;
  font-size: 28px;  
  line-height: 28px;
}
  
.cds-circle-icon--sm {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  font-size: 18px;
  line-height: 18px;
}
