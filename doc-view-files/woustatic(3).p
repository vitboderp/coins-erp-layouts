/* coinsv2src.css - UI v2 style */





TABLE.headertitle {
    border-collapse: inherit;
    height: 60px;
    padding: 6px 20px 5px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
    position: relative;
}

.avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 24px;
    font-weight: 700;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: rgba(0,0,0,0.1);
    border: 2px solid #ffffff;
    color: #767676;
    box-sizing: border-box;
}

#user-header {
    cursor: pointer;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    margin-right: 12px;
    margin-left: 0;
    background-color: #ffffff;
    border: 1px solid transparent;
    height: 44px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
    transition: 0.3s;
}

.mode-dark #user-header {
    border: 1px solid rgba(0,0,0,0.1);
}

#user-name {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin-right: 0;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #2a2a2a;
    margin-right: 12px;
}

.user-name-description {
    font-size: 10px;
    line-height: 10px;
    font-weight: 400;
    color: #767676;
}

div.banner {
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
}

div.banner div {
    margin: 0;
}

div.banner img:hover {
    background-color: transparent;
}

div.banner div#user-header:hover {
    background-color: rgba(66,73,88,0.1);
    border: 1px solid rgba(0,0,0,0.1);
}

#user-image {
    margin: 0;
    height: 28px;
    width: 28px;
    background-size: cover;
}

/* menu icon only on root menu */
div#menuTree.rolemenu table.treeitems.root i.icn.menuicon{
    display:unset;
    margin-right: 8px;
}
div#menuTree.rolemenu table.treeitems a.treelink i.linkicon{
    display:none;
}
div#menuTree.rolemenu table.treeitems.root a.treelink i.linkicon{
    display:unset;
}

div#treeView {
    padding: 0;
    background-color: #ffffff;
    overflow-x: hidden;
}

div#treeView tr, table.treeitems tr, table.subtree tr {
    position: relative;
}

#menuTree {
    background-color: #ffffff;
}

#menuTree table {
    width: 100%;
}

#menuTree table tbody {
    padding: 0;
}

#menuTree table td {
    padding: 0;
    position: relative;
}

#menuTree table.treeitems.root {
    padding-left: 0;
    table-layout: fixed;
}

#menuTree table.treeitems,
#menuTree table.subtree {
    padding-left: 0;
}

#menuTree .treeitems.root > tbody > tr > td {
    height: 32px;
    cursor: pointer;
}

#menuTree .treeitems.root > tbody > tr > td:first-child {
    width: 32px;
}

#menuTree .treeitems.root > tbody > tr > td > a {
    font-size: 14px;
    line-height: 20px;
}

#menuTree .treeitems.root > tbody > tr > td:first-child a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#menuTree .treeitems.root > tbody > tr > td:first-child a .linkicon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#menuTree .menu-opener {
    width: 32px;
    text-align: center;
}

#menuTree table.treeitems:not(.treeitems-expanded):not(.treegroup) tr:hover > td {
    background-color: rgba(66,73,88,0.1);
}

#menuTree table.treeitems.treegroup > tbody > tr {
    height: 32px;
}

#menuTree table.subtree.is-empty > tbody > tr {
    height: 0;
}

#menuTree table.treeitems.treegroup > tbody > tr > td a {
    cursor: default;
}

#menuTree table.subtree ~ table.treegroup {
    border-top: 1px solid rgba(0,0,0,0.1);
    margin-top: 12px;
}

#menuTree.rolemenu table.treeitems.treeitems-expanded ~ table.subtree {
    margin-bottom: 12px;
}

#menuTree table.treeitems a.treelink {
    outline: none!important;
}

#menuTree table.treeitems .treelink a {
    display: flex;
    height: 24px;
    box-sizing: border-box;
    align-items: center;
    outline: none;
    font-weight: 400;
}

#menuTree table.treeitems:not(.root) + table.subtree {
    padding-left: 26px;
}

#menuTree table.subtree > tbody > tr > td:first-child {
    width: 0;
    max-width: 0;
}

#menuTree table.treeitems:not(.root) > tbody > tr > td:first-child {
    width: 32px;
    max-width: 32px;
    min-width: 32px;
    position: relative;
}

#menuTree table.treeitems:not(.root) > tbody > tr > td:first-child.menu-opener .icn {
    margin-left: 0;
    padding-left: 0;
}

#menuTree table.treeitems:not(.root) > tbody > tr > td:first-child a {
    padding-left: 0;
    padding-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    outline: none!important;
}

#menuTree table.treeitems:not(.root) > tbody > tr > td.menu-opener {
    position: relative;
}

#menuTree table.treeitems:not(.root) > tbody > tr > td:first-child a:before,
#menuTree table.treeitems:not(.root) > tbody > tr > td.menu-opener .icn:after {
    content: '';
    position: absolute;
    top: 0;
    right: 100%;
    height: 100%;
    width: 3000px;
    background: transparent;
    opacity: 0;
}

#menuTree table.treeitems:not(.root) > tbody > tr:hover > td:first-child a:before,
#menuTree table.treeitems:not(.root) > tbody > tr:hover > td.menu-opener > .icn:after {
    background-color: rgba(66,73,88,0.1);
    opacity: 1;
}

#menuTree table.treeitems.treeitems-expanded:not(.root) > tbody > tr > td.menu-opener > .icn:after,
#menuTree .treeitems.treelinkhi > tbody > tr > td:first-child a:before {
    background-color: rgba(66,73,88,0.1)!important;
    opacity: 1!important;
}

#menuTree .treeitems.treeitems-expanded > tbody > tr > td,
#menuTree .treeitems.treelinkhi > tbody > tr > td {
    background-color: rgba(66,73,88,0.1)!important;
}

#menuTree .treeitems.treeitems-expanded > tbody > tr > td *,
#menuTree .treeitems.treelinkhi > tbody > tr > td * {
    color: #2a2a2a!important;
}

#menuTree .treeitems.treeitems-expanded.root > tbody > tr > td {
    background-color: #4a4a4a!important;
}

#menuTree .treeitems.treeitems-expanded.root > tbody > tr > td * {
    color: #ffffff!important;
}

/* full menu  */
#menuTree:not(.rolemenu) table.treeitems.root.treeitems-expanded ~ table.subtree {
    padding-left: 24px;
}


#menuTree span.loading {
    padding: 12px 32px;
    display: block;
    color: #767676;
    margin: 12px 0;
}

tr.resultrow td.resulticon i {
    color: #2a2a2a;
    font-size: 20px;
    line-height: 1;
}

div#noresults {
    padding: 12px;
    display: block;
    color: #767676;
    margin: 12px 0;
}

#menu_closed {
    margin-left: 0;
}

#menu_closed .icn {
    color: #2a2a2a;
    font-size: 20px;
    font-weight: bold;
}

td.treegroup {
    color: #767676;
    padding-left: 3px;
    text-transform: uppercase;
    padding-top: 24px;
    padding-bottom: 8px;
    padding-top: 16px!important;
}

#logo {
    margin: 0;
}

table.treeitems i.icn {
    line-height: 1;
    font-size: 20px;
    color: #767676;
}

table.treeitems i.icn-Chevron-Down,
table.treeitems i.icn-Chevron-Right {
    font-weight: 700;
    position: absolute!important;
    top: 0px!important;
    left: 0px!important;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-left: 12px;
    cursor: pointer;
}

.desktopheader.ui-layout-pane {
    height: 115px!important;
}
.desktop.ui-layout-pane {
    inset: 115px 0px 0px!important;
}

div.ui-layout-west {
    color: #2a2a2a;
    background-color: #ffffff;
}


/* Search list  */

#functionSearchList tbody {
    padding: 0;
}

#functionSearchList table {
    width: 100%;
    border: none;
}

#functionSearchList .resultheader {
    height: 56px;
    position: relative;
}

#functionSearchList .resultheader > td {
    padding: 8px 12px;
    border-top: 1px solid rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.1);
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #767676;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
}

#functionSearchList > table > tbody > .resultheader:first-child {
    height: 32px;
}

#functionSearchList > table > tbody > .resultheader:first-child > td {
    border-top: none;
}

#functionSearchList .resultrole {
    height: 40px;
}

#functionSearchList .resultrole > td {
    padding: 0 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #2a2a2a;
}

#functionSearchList .resultrow > td > a {
    padding: 0 12px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #2a2a2a;
    display: block;
}

#functionSearchList tr.resultrow.highlight {
    background-color: rgba(66,73,88,0.1);
}


/* Function search input */
div#selectors div#functionSearchInput {
    padding: 8px!important;
    height: auto!important;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}

.tree-close-wrapper {
    margin-right: 10px;
}

button.image-button.tree-close-button {
    border: 1px solid rgba(0,0,0,0.1);
    color: #767676;
    min-width: 28px;
    min-height: 28px;
    cursor: pointer;
    transition: background .3s, color .3s;
    transform: rotate(-90deg);
    outline: none;
}

button.image-button.tree-close-button:hover {
    color: #2a2a2a;
}

div#selectors div#functionSearchInput > table {
    margin: 0;
    border: 1px solid rgba(0,0,0,0.1);
    background-color: #ffffff;
    border-radius: 2px;
    transition: .3s;
    position: relative;
}

div#selectors input#functionSearch {
    height: 20px;
    padding-left: 4px;
}

div#functionSearchInput i.icn-Search {
    padding: 4px;
    color: #2a2a2a;
}

div#functionSearchInput i.icn-Close {
    color: #2a2a2a;
}

div#selectors div#functionSearchInput > table:hover {
    border: 1px solid #4a4a4a;
}
  
div#selectors div#functionSearchInput > table:focus-within{
    border: 1px solid #767676;
}

div#selectors div#closeAll {
  background-color: #ffffff;
}
div#selectors div#closeAll:hover {
  background-color: rgba(66,73,88,0.1);
}

/* Restyling header table into flexbox styles */
tr.headertitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0;
    position: relative;
    background-color: #ffffff;
}

tr.headertitle a#productbtn {
    width: auto;
    height: 44px;
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-right: 8px;
    cursor: pointer;
    padding: 2px 8px 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: #2a2a2a;
    text-decoration: none;
    outline: none;
    transition: 0.3s;
}

tr.headertitle a#productbtn:hover {
    background-color: rgba(66,73,88,0.1);
}

tr.headertitle a#productbtn .menu-control-title {
    font-weight: 400;
    font-size: 10px;
    line-height: 1;
    height: 16px;
    width: 100%;
    color: #767676;
}

tr.headertitle a#productbtn .menu-control-value {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

tr.headertitle a#productbtn .menu-control-text {
    color: #2a2a2a;
    font-size: 12px;
    height: auto!important;
}

tr.headertitle a#productbtn .menu-control-logo {
    margin-right: 8px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
}

tr.headertitle a#productbtn .menu-control-logo img {
    margin: 0;
    height: 100%;
    width: 100%;
}

td.headertitle {
    padding: 0px;
}

/* Header breadcrumbs (company selector, role selector etc.) */
td.headertitle li {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
    padding: 8px;
    white-space: nowrap;
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    border-radius: 4px;
    height: 44px;
    box-sizing: border-box;
    margin-bottom: 0;
    margin-right: 8px;
}

td.headertitle ul {
    padding: 0;
}

td.headertitle li span:before, td.headertitle li span:after, td.headertitle li.link:hover span:before, td.headertitle li.link:hover span:after {
    display: none;
}

td.headertitle span {
    padding: 0!important;
    display: flex;
    align-items: center;
}

td.headertitle select {
    color: #2a2a2a;
}

td.headertitle li:first-child {
    width: auto;
    border-left: 1px solid rgba(0,0,0,0.1);
}

td.headertitle li:first-child img {
    position: static;
}

td.headertitle li:last-child {
    border-right: 1px solid rgba(0,0,0,0.1);
}

td.headertitle li.company-selector,
td.headertitle li.role-selector {
    flex-direction: column;
    align-items: flex-start;
}

td.headertitle li.company-selector:hover,
td.headertitle li.role-selector:hover {
    background-color: rgba(66,73,88,0.1);
}

div#userroleCombo {
    margin-left: 0;
}

td.headertitle li span.text-description {
    font-weight: 400;
    font-size: 10px;
    line-height: 1;
    color: #767676;
}

td.headertitle li.company-selector .text-title,
td.headertitle li.company-selector #singleCompany {
    padding: 8px!important;
    display: flex;
    align-items: flex-end;
    height: 44px;
    box-sizing: border-box;
    color: #2a2a2a;
}

TR.headertitle a.td {
    color: #2a2a2a!important;
}

#separator {
    font-size: 16px;
    height: auto;
    color: #2a2a2a;
    line-height: 1;
    margin-bottom: -2px;
}

td.headertitle li span.text-description ~ span {
    padding: 0!important;
    height: 44px;
    margin-top: -22px;
    margin-bottom: -9px;
    margin-left: -9px;
    margin-right: -9px;
}

.styled-select {
    background: none!important;
    position: relative;
    overflow: hidden;
    display: inline-flex;
    vertical-align: middle;
}

li.company-selector,
li.role-selector {
    padding-top: 2px!important;
    transition: .2s;
}

li.company-selector:hover,
li.role-selector:hover {
    background: rgba(66,73,88,0.1);
}

li.company-selector .styled-select,
li.role-selector .styled-select {
    height: 44px;
    padding-right: 8px;
}

.styled-select:after {
    content: "\e925";
    position: absolute;
    right: 6px;
    bottom: 50%;
    transform: translateY(50%);
    font-size: 18px;
    font-family: "iCoins" !important;
    font-style: normal;
    font-weight: bold;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    pointer-events: none;
    -webkit-font-smoothing: antialiased;
}

td.headertitle li .styled-select:after {
    content: "\e925";
    bottom: 13px;
    color: #767676;
}

td.headertitle li .styled-select select {
    background: none!important;
    height: 44px;
    padding: 20px 16px 4px 8px;
    font-weight: bold!important;
    box-sizing: border-box;
    display: block;
    cursor: pointer;
}

#rowRO_msi_icon .styled-select {
    overflow: visible;
}

.dd-select {
    height: 24px;
    background: #ffffff!important;
    border: 1px solid rgba(0,0,0,0.1);
    transition: border .3s;
}

.dd-select:hover {
    border: 1px solid #4a4a4a;
}

.dd-select:focus,
#rowRO_msi_icon .styled-select:focus-within .dd-select {
    border: 1px solid #4a4a4a;
}

.dd-pointer-down {
    display: none;
}

.dd-options {
    border-color: rgba(0,0,0,0.1);
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1);
    background: #ffffff;
}

.dd-options > li {
    margin: 0;
    font-size: 12px;
    background: #ffffff;
}

.dd-option,
.dd-option-text {
    display: flex;
    align-items: center;
    color: #2a2a2a;
}

.dd-option {
    background: #ffffff;
    border-color: rgba(0,0,0,0.1);
    padding: 6px 12px;
}

.dd-option:hover {
    background: rgba(66,73,88,0.1);
}

.fa-2x {
    font-size: 20px;
}



/* Banner btn (report status, search, info etc.) */
.banner-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: #2a2a2a;
    font-size: 32px;
    height: 44px;
    width: 44px;
    border: 1px solid rgba(0,0,0,0.1)!important;
    border-radius: 4px;
    box-sizing: border-box;
    text-decoration: none;
    transition: .3s;
    cursor: pointer;
    margin-right: 8px;
}

.mode-dark .banner-btn {
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.1)!important;
}

.banner-btn .icn {
    color: #2a2a2a;
    font-size: 24px;
}

.banner-btn:hover {
    background-color: rgba(66,73,88,0.1);
    border: 1px solid rgba(0,0,0,0.1)!important;
}

.banner-btn .notification-bullet {
    top: -4px;
    right: -4px;
}

.banner-btn.is-active {
    background-color: rgba(66,73,88,0.1);
}

/* Header search  */
.headertitle.page-title,
.headertitle.page-title ul:first-of-type {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.search-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 16px;
}

.header-search {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-basis: 430px;
    padding: 10px 16px;
    height: 44px;
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    transition: .3s;
}

.header-search:hover {
    border-color: rgba(66,73,88,0.1);
}

.header-search:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    border: 1px solid #767676;
    border-radius: 5px;
    opacity: 0;
    transition: .3s;
}

.header-search:focus-within {
    border: 1px solid #767676;
}

.header-search:focus-within:after {
    opacity: 1;
}

.header-search .icn {
    font-size: 22px;
    margin-right: 8px;
    color: #2a2a2a;
}

.header-search #headerSearch {
    width: 100%;
    min-width: 75px;
    height: 24px;
    border: none;
    outline: none;
    font-weight: normal;
    background: none;
    color: #2a2a2a;
    z-index: 1;
}

.header-search #headerSearch::placeholder {
    color: #767676;
}

.header-search .search-dropdown {
    margin-right: 8px;
    background: none;
    border: none;
    color: #2a2a2a;
    font-size: 14px;
    display: flex;
    align-items: center;
    outline: none;
    cursor: pointer;
}

.header-search .search-dropdown .icn {
    font-size: 18px;
    margin-left: 4px;
    margin-right: 0;
}


/* West sidebar togler and resizer  */
.ui-layout-toggler.ui-layout-toggler-west {
    height: 100%!important;
    width: 8px!important;
    top: 0!important;
    left: 0!important;
    background: transparent;
    border-width: 0px;
}

.ui-layout-resizer.ui-layout-resizer-west {
    top: 0px!important;
    overflow: visible!important;
    background-color: rgba(66,73,88,0.1)!important;
}

.mode-dark .ui-layout-resizer.ui-layout-resizer-west {
    background-color: rgba(0,0,0,0.1)!important;
}

.ui-layout-toggler-west-open {
    cursor: ew-resize!important;
}

.mode-dark #SESD .ui-layout-resizer.ui-layout-resizer-west {
    background: #4a4a4a!important;
}

#SESD .ui-layout-resizer.ui-layout-resizer-west-closed {
    margin-left: 6px!important;
}

#SESD .ui-layout-toggler.ui-layout-toggler-west {
    height: 50px!important;
    width: 6px!important;
    background: #BBB;
    top: calc(50% - 25px)!important;
    cursor: pointer!important;
}

.dhxwins_dock.dhxwins_dock_hidden {
    width: 18px!important;
}

/* East sidebar togler  */
.ui-layout-resizer.ui-layout-resizer-east {
    width: 8px!important;
    background: #4a4a4a!important;
}

.mode-dark .ui-layout-resizer-south {
    background: #4a4a4a!important;
}

div.ui-layout-pane-south {
    border-color: rgba(0,0,0,0.1)!important;
}

.ui-layout-toggler.ui-layout-toggler-east {
    width: 8px!important;
    height: 38px!important;
    background: #4a4a4a;
    border-radius: 1px;
    position: relative;
}

.ui-layout-toggler.ui-layout-toggler-east:after {
    content: '';
    position: absolute;
    top: calc(50% - 3px);
    left: 3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 3px 0 3px 4px;
    border-color: transparent transparent transparent #ffffff;
}

/* Dashboard toggle button pill  */
td.headertitle .pill.minframes {
    position: absolute;
    top: 5px;
    right: 5px;
}

/* Header notification bullets */
#user-avatar {
    margin: 0;
}

.notification-bullet {
    width: 10px;
    height: 10px;
    background: #ed0034;
    border: 2px solid #ffffff;
    box-sizing: border-box;
    font-size: 0;
    margin: 0!important;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
}

/* icons on user popup */
div.optionicon i {
    font-size: 24px;
    margin-right: 6px;
}

div.popupmenu div.title i {
    font-size:24px;
    margin-right:6px;
}

table.popuplist.history i{
    font-size: 24px;
    margin-right: 6px;
}

table.popuplist.actions i{
    font-size: 24px;
    margin-right: 6px;
}

table.popuplist.reports i{
    font-size: 24px;
    margin-right: 6px;
}

/* User popup styling */
#userpopup {
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 10px 20px rgba(0,0,0,0.1)!important;
    border: 1px solid rgba(0,0,0,0.1);
    border-bottom: none;
    box-sizing: border-box;
}

#userpopup .option {
    position: relative;
    padding: 12px 32px 12px 12px!important;
    height: auto!important;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    min-width: 170px;
    font-size: 12px;
    line-height: 1;
    color: #2a2a2a;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,0.1)!important;
}

div.popupmenu div.option {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    color: #2a2a2a!important;
}

#userpopup .option:hover,
div.popupmenu div.option:hover {
    background-color: rgba(66,73,88,0.1);
}

#userpopup a {
    text-decoration: none;
    align-items: center;
}

#userpopup .option .icn {
    font-size: 16px;
    line-height: 1;
    margin-right: 8px;
}

#userpopup .optiondropdown {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#userpopup .optiondropdown .icn {
    font-size: 18px;
    font-weight: bold;
}

#userpopup .newTasks.outstandingnumber {
    justify-content: center;
    height: 14px;
    box-sizing: border-box;
    background-color: #ed0034;
    font-size: 10px;
    line-height: 10px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    padding: 2px 4px;
    min-width: 20px;
    border-radius: 8px;
    margin-left: 4px;
    position: static;
    border: none;
}

#popupList {
    border-radius: 4px;
    overflow: hidden;
}

#popupList table.popuplist > tbody {
    flex-direction: column;
    padding: 0;
}

#popupList table.popuplist td {
    border: none;
}

#popuplist table.popuplist td a.history-item tr:hover {
    background: transparent!important;
}

#popupList table.popuplist > tbody tr {
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.1)!important;
}

#popupList table.popuplist > tbody > tr > th {
    width: 100%;
    align-items: center;
    font-size: 12px;
    padding: 12px;
    color: #ffffff;
    background: #4a4a4a;
}

#popupList table.popuplist > tbody >tr > td {
    height: auto;
    padding: 12px;
    margin: 0;
}

#popupList table.popuplist > tbody td.padding {
    display: none;
}

#popupList table.popuplist i.icn {
    font-size: 18px;
}

#popupList table.popuplist a table td {
    height: auto;
    margin: 0;
    padding: 0;
}

#popupList table.popuplist a table td:first-child {
    margin-right: 6px;
}

table.popuplist tr {
    background-color: #ffffff;
    color: #2a2a2a;
}

table.popuplist tr:hover {
    background-color: rgba(66,73,88,0.1);
}

#popupList table.popuplist a table tr {
    border-bottom: none!important;
}

#popupList table.popuplist a table td.addtodesktop {
    width: 45px!important;
    justify-content: center;
    align-items: center;
}

table.popuplist a:hover {
    color: #2a2a2a;
}

#popupList .history-row:hover {
    background: transparent!important;
}

#popupList .history-col {
    padding: 0!important;
    position: relative;
}

#popupList .history-item {
    padding: 12px 48px 12px 12px;
    display: flex;
    align-items: center;
}

#popupList .history-item:hover {
    background-color: rgba(66,73,88,0.1);
}

#popupList .history-add {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    border: 1px solid transparent;
    border-radius: 4px;
}

#popupList .history-add > .icn {
    margin: 0;
}

#popupList .history-add:hover {
    background-color: rgba(66,73,88,0.1);
    border-color: rgba(0,0,0,0.1);
}

#popupList table.popuplist.actions .popuplist-description {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    padding: 12px;
}

#popupList table.popuplist.actions .popuplist-cell {
    padding: 0;
}

#popupList table.popuplist.actions .popuplist-subject {
    width: 100%;
    text-align: left;
    padding: 0 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 300px;
}

/* Product popup  */
#productpopup {
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 10px 20px rgba(0,0,0,0.1)!important;
    border: 1px solid rgba(0,0,0,0.1);
    border-bottom: none;
    box-sizing: border-box;
}

#productpopup a {
    text-decoration: none;
}
#productpopup .option {
    min-height: 45px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 12px;
    font-weight: 700;
}

/* report popup */
table.reports {
    width: auto;
    min-width: 380px;
    max-width: 500px;
    background: #ffffff;
}

table.popuplist {
    background: #ffffff;
}

.popuplist.reports tr:hover {
    background-color: #ffffff;
}

.popuplist.reports tr.unread:hover,
.popuplist.reports tr.read:hover {
    background-color: rgba(66,73,88,0.1);
}

.popuplist.reports .report-col {
    padding: 0!important;
    position: relative;
}

.popuplist.reports .report-link,
.popuplist.reports .report-nolink {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    cursor: pointer;
    background-color: #ffffff;
    padding: 12px 96px 12px 30px;
    transition: .3s;
}

.popuplist.reports tr.unread .report-link{
    background-color: rgba(66,73,88,0.1);
}

.popuplist.reports tr.unread .report-link:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ed0034;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
}

.popuplist.reports .report-link:hover {
    background-color: rgba(66,73,88,0.1);
}

.popuplist.reports .report-link i.icn {
    font-size: 18px!important;
}

.popuplist.reports .report-link i.icn-Print,
.popuplist.reports .report-nolink i.icn-Print {
    font-size: 24px!important;
    color: #767676;
}

.popuplist.reports .report-description {
    padding: 0 12px 0 0;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
}

.popuplist.reports .report-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 332px;
}

.popuplist.reports .report-datetime {
    font-size: 10px;
    line-height: 14px;
    font-weight: 300;
    color: #767676;
}

.popuplist.reports .report-status {
    justify-self: flex-end;
    margin-left: auto;
}

.popuplist.reports .report-actions {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
}

.popuplist.reports .report-actions .cds-btn .icn {
    margin-right: 0;
}

.popuplist.reports .report-actions .cds-btn {
    border: 1px solid transparent;
    border-radius: 4px;
    margin-left: 3px;
    color: #2a2a2a;
}
.popuplist.reports .report-actions .cds-btn:hover {
    background-color: rgba(66,73,88,0.1);
    border-color: rgba(0,0,0,0.1);
}

table.popuplist th {
    background: #ffffff;
    color: #2a2a2a;
    font-weight: 400;
    font-size: 14px!important;
    line-height: 20px;
    box-sizing: border-box;
}

div#browsepopup,
div#userpopup,
div#productpopup {
    background: #ffffff;
}

/* datatable style  */
table.dataTable thead th,
table.dataTable tfoot th {
    padding: 4px 24px 4px 8px;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    text-align: left;
    color: #2a2a2a;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.dataTables_wrapper.no-footer .dataTables_scrollBody {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    min-height: 200px;
    height: auto!important;
}

.dataTables_info {
    font-size: 12px;
    line-height: 1;
    color: #767676!important;
}

table.dataTable thead .sorting,
table.dataTable thead .sorting_asc,
table.dataTable thead .sorting_desc {
    position: relative;
    background: none;
}

.dataTables_scrollHead table.dataTable thead .sorting:after {
    content: "\e9e0";
    top: calc(50% - 3px);
    color: #767676;
}

.dataTables_scrollHead table.dataTable thead .sorting:before {
    content: "\e9e3";
    bottom: calc(50% - 3px);
    color: #767676;
}

.dataTables_scrollHead table.dataTable thead .sorting:before,
.dataTables_scrollHead table.dataTable thead .sorting:after,
.dataTables_scrollHead table.dataTable thead .sorting_asc:before,
.dataTables_scrollHead table.dataTable thead .sorting_desc:before {
    font-family: "iCoins" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    right: 6px;
}

.dataTables_scrollHead table.dataTable thead .sorting_asc:before {
    content: "\e9e3";
}

.dataTables_scrollHead table.dataTable thead .sorting_desc:before {
    content: "\e9e0";
}

.dataTables_scrollHead table.dataTable thead .sorting_asc:before,
.dataTables_scrollHead table.dataTable thead .sorting_desc:before {
    color: #2a2a2a;
    font-size: 18px;
    top: 50%;
    right: 3px;
    transform: translateY(-50%);
}

TR.odd > TD,
TR.even > TD {
    border-color: rgba(0,0,0,0.1);
}

TR.odd, TR.matrixodd, TR.scrollodd {
    background: transparent;
}

TR.even, TR.matrixeven, TR.scrolleven {
    background: transparent;
}

TR.activerow:hover, TR.hover {
    background: transparent;
}

.dataTables_scrollBody TR.odd > TD,
.dataTables_scrollBody TR.even > TD {
    vertical-align: center;
    height: auto;
    padding: 12px 12px 12px 8px;
    font-weight: 400;
    color: #2a2a2a;
}

table.dataTable.stripe tbody tr.odd,
table.dataTable.display tbody tr.odd,
table.display.dataTable tr.odd,
table.display.dataTable tr.even {
    background: #ffffff;
}

table.dataTable.display tbody tr.odd > .sorting_1,
table.dataTable.order-column.stripe tbody tr.odd > .sorting_1,
table.dataTable.display tbody tr.even > .sorting_1,
table.dataTable.order-column.stripe tbody tr.even > .sorting_1 {
    background: #ffffff;
}

table.dataTable.row-border tbody th,
table.dataTable.row-border tbody td,
table.dataTable.display tbody th,
table.dataTable.display tbody td {
    border-top: none;
}

table.dataTable.hover tbody tr:hover,
table.dataTable.hover tbody tr.odd:hover, 
table.dataTable.hover tbody tr.even:hover, 
table.dataTable.display tbody tr:hover, 
table.dataTable.display tbody tr.odd:hover, 
table.dataTable.display tbody tr.even:hover {
    background-color: rgba(66,73,88,0.1);
}

table.dataTable.stripe tbody tr:last-child td,
table.dataTable.display tbody tr:last-child td {
    border-bottom: none;
}

table.dataTable a {
    color: #2a2a2a;
    text-decoration: underline;
}

table.dataTable.display tbody tr:hover > .sorting_1,
table.dataTable.display tbody tr.odd:hover > .sorting_1,
table.dataTable.display tbody tr.even:hover > .sorting_1,
table.dataTable.order-column.hover tbody tr:hover > .sorting_1,
table.dataTable.order-column.hover tbody tr.odd:hover > .sorting_1,
table.dataTable.order-column.hover tbody tr.even:hover > .sorting_1 {
    background-color: transparent;
}

.cds-card--datatable {
    justify-content: flex-start;
}

.cds-card--datatable .cds-card__title {
    width: calc(100% - 200px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cds-card--datatable .cds-card__header {
    height: 60px;
}

.dataTables_wrapper .dataTables_filter {
    font-size: 0;
    margin-bottom: 28px;
    margin-top: -45px;
    margin-right: 36px;
}

.dataTables_wrapper .dataTables_filter label {
    display: block;
    position: relative;
    border: 1px solid transparent;
    border-radius: 3px;
    transition: .3s;
}

.dataTables_wrapper .dataTables_filter label:after {
    content: "\e990";
    position: absolute;
    color: #2a2a2a;
    font-size: 12px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: "iCoins" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.dataTables_wrapper .dataTables_filter input {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    width: 160px;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.1)!important;
    box-sizing: border-box;
    border-radius: 2px !important;
    height: 28px !important;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
    padding: 6px 28px 6px 12px !important;
    font-size: 12px;
    margin: 0!important;
    line-height: 16px;
    outline: none;
    transition: .3s;
}

.dataTables_wrapper .dataTables_filter input:hover {
    border: 1px solid #4a4a4a!important;
}

.dataTables_wrapper .dataTables_filter input:focus {
    border: 1px solid #767676!important;
    background-color: #ffffff;
}

.dataTables_wrapper .dataTables_filter label:focus-within {
    border: 1px solid #767676!important;
}


/* Default tables styling  */
tr.bodyhead th,
tr.bodyspan th {
    border-left: 1px solid #2a2a2a;
}

tr.bodyspan th,
td.bodytitle {
    border-bottom: 1px solid #2a2a2a;
    height: 30px;
}

body.mode-dark tr.bodyhead th {
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

body.mode-dark tr.bodyhead th,
body.mode-dark tr.bodyspan th {
    border-left: 1px solid rgba(0,0,0,0.1);
}

body.mode-dark tr.bodyspan th,
body.mode-dark td.bodytitle {
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

tr.bodyhead th:first-child,
tr.bodyspan th:first-child {
    border-left: none;
}

tr.bodyhead + tr td {
    border-top: none;
}

div.UI_A tr.bodyhead th,
div.UI_A td.total {
    background-color: #ffffff;
    color: #767676;
    border-color: transparent;
}

div.UI_A td[class^="formgroup"] {
    border-color: rgba(0,0,0,0.1);
}

/* Body light/dark mode background  */
/* Needed for resizer background highlight  */
body.ui-layout-container {
    background-color: rgba(66,73,88,0.1);
}

html.mainarea {
    width: 100%;
}


/* dropdown role selector */
.cds-dropdown-btn {
    padding: 12px 10px;
    width: 100%;
    color: #2a2a2a;
    background-color: #ffffff;
}
  
.cds-dropdown-btn__icon {
    width: 28px;
    height: 28px;
    min-width: 28px;
    border-radius: 4px;
    background: #E9926D;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
        align-items: center;
    -ms-flex-pack: center;
        justify-content: center;
}
  
.cds-dropdown-btn__icon .icn {
    font-size: 14px;
    line-height: 1;
    color: #fff;
}
  
.cds-dropdown-btn__data {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: start;
        align-items: flex-start;
    -ms-flex-pack: center;
        justify-content: center;
    -ms-flex-direction: column;
        flex-direction: column;
    padding-left: 10px;
    white-space: nowrap;
    overflow: hidden;
}
  
.cds-dropdown-btn__type {
    font-size: 10px;
    line-height: 14px;
    color: #767676;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    text-align: left;
}
  
.cds-dropdown-btn__value {
    font-size: 14px;
    line-height: 16px;
    color: #2a2a2a;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
}
  
.cds-dropdown-btn__chevron {
    justify-self: end;
    margin-left: auto;
    font-size: 24px;
    color: #2a2a2a;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
        align-items: center;
}
  
.cds-dropdown-btn:hover, .cds-dropdown-btn.is-active {
    background-color: rgba(66,73,88,0.1);
}

/* menu search */
div#selectors div#functionSearchInput{
    background-color: #ffffff;
    padding-top: 5px;
    padding-bottom: 5px;
    border: solid 1px rgba(0,0,0,0.1);
    height: 32px;
}

i#clearicon:hover{
    background-color: #4a4a4a;
    border-radius: 4px;
}

div#selectors div#functionSearchInput table{   
    border: 1px solid rgba(0,0,0,0.1);
    color: #2a2a2a
}

input#functionSearch{
    background-color: #ffffff;
    color: #2a2a2a;
}
input#functionSearch::-webkit-input-placeholder{
    color: #767676;
}
input#functionSearch:focus::-webkit-input-placeholder{
    color: #767676;
}
table#functionsearchlist tr.resultheader {
    color: #2a2a2a;
}
table#functionsearchlist tr.resultrole {
    color: #2a2a2a;
}
table#functionsearchlist.rolemenu td.resulticon {
    display:none;
}

/* role popup */
.cds-dropdown__item:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

.cds-dropdown--role .cds-dropdown__body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
        flex-direction: column;
    padding: 12px;
    color: #2a2a2a;
    background-color: #ffffff;
}
  
.cds-dropdown--role .cds-dropdown__search {
    margin-bottom: 12px;
}
  
.cds-dropdown--role .cds-dropdown__search .cds-input {
    width: 200px;
}
  
.cds-dropdown--role .cds-dropdown__search .cds-form-control {
    width: 100%;
}
  
.cds-dropdown--role .cds-dropdown__row {
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -ms-flex-direction: row;
        flex-direction: row;
    min-width: 0;
    padding: 0;
    max-width: 1000px;
    overflow: auto;
    flex-wrap: nowrap;
    padding-bottom: 8px;
}
  
.cds-dropdown--role .cds-dropdown__item {
    border: 1px solid rgba(0,0,0,0.1);
    border-right: none;
    -ms-flex: 1;
        flex: 1;
    text-decoration: none;
    color: #2a2a2a;
    background-color: #ffffff;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
        flex-direction: column;
    -ms-flex-align: start;
        align-items: flex-start;
    -ms-flex-pack: start;
        justify-content: flex-start;
    padding: 20px;
    box-sizing: border-box;
    width: 240px;
    min-height: 320px;
    transition: background-color .3s;
}
    
.cds-dropdown--role .cds-dropdown__item:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
  
.cds-dropdown--role .cds-dropdown__item:last-child {
    border-right: 1px solid rgba(0,0,0,0.1);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
  
.cds-dropdown--role .cds-role-icon {
    width: 28px;
    height: 28px;
    min-width: 28px;
    border-radius: 4px;
    background: #E9926D;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
        align-items: center;
    -ms-flex-pack: center;
        justify-content: center;
    margin-bottom: 12px;
}
  
.cds-dropdown--role .cds-role-icon .icn {
    font-size: 14px;
    line-height: 1;
    color: #fff;
}
  
.cds-dropdown--role .cds-role-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 16px;
}
  
.cds-dropdown--role .cds-dropdown__list {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
        flex-direction: column;
    padding: 0;
    margin: 0 -8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    width: calc(100% + 16px);
    box-sizing: border-box;
}
  
.cds-dropdown--role .cds-dropdown__list > li {
    display: block;
    white-space: nowrap;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 4px 16px 4px 8px;
    min-width: 200px;
    box-sizing: border-box;
    margin: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cds-west-pane {
    color: #2a2a2a;
    background-color: #ffffff;
}
  
.cds-west-search {
    padding: 8px;
}
  
.cds-west-search .cds-input,
.cds-west-search .cds-form-control {
    width: 100%;
}
  
.cds-search-results__counter {
    font-size: 12px;
    line-height: 16px;
    color: #767676;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 4px 12px;
}
  
.cds-search-results__item {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 12px 12px 24px 12px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
    -ms-flex-direction: row;
        flex-direction: row;
    -ms-flex-align: start;
        align-items: flex-start;
    color: #2a2a2a;
    width: 100%;
    box-sizing: border-box;
}
  
.cds-search-results__icon {
    width: 20px;
    height: 20px;
    min-width: 20px;
    border-radius: 4px;
    background: #E9926D;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
        align-items: center;
    -ms-flex-pack: center;
        justify-content: center;
    margin-right: 8px;
}
  
.cds-search-results__icon .icn {
    font-size: 14px;
    line-height: 1;
    color: #fff;
}
  
.cds-search-results__data {
    width: 100%;
}
  
.cds-search-results__name {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 4px;
}
  
.cds-search-results .text-uppercase {
    margin-bottom: 4px;
}
  
.cds-search-results__link {
    font-size: 12px;
    line-height: 16px;
    color: $(theme_textnomal);
    text-decoration: none;
    cursor: pointer;
    display: block;
    width: calc(100% + 52px);
    margin-left: -40px;
    padding: 4px 8px 4px 40px;
    box-sizing: border-box;
    margin-bottom: 0;
}
  
.cds-search-results__link:hover {
    background: rgba(0,0,0,0.1);
}
  

/* Inner pages table styles */
tr.bodyspan th, td.bodytitle {
    padding: 3px 8px;
    box-sizing: border-box;
    line-height: 12px;
    font-size: 12px;
    margin: 0;
}

tr.bodyhead th {
    padding: 0 8px;
    box-sizing: border-box;
    height: 34px;
}

tr.bodyhead th p {
    line-height: 12px;
    font-size: 12px;
    margin: 0;
}

TR.odd > TD, TR.even > TD {
    font-weight: 400;
    padding: 3px 8px;
    box-sizing: border-box;
    background-color: #ffffff;
    transition: .3s;
    height: 34px;
}

TR.odd > TD a, TR.even > TD a {
    color: #2a2a2a;
}

tr.activerow:hover td[class*="coins_"], tr.selected td[class*="coins_"] {
    opacity: 1;
}

TR.odd:hover > TD,
TR.even:hover > TD,
TR.odd.hover > TD,
TR.even.hover > TD,
TR.odd.selected > TD,
TR.even.selected > TD {
    background-color: rgba(66,73,88,0.1);
    color: #2a2a2a;
}

TD.alert {
    color: #ed0034!important;
}

td.contextbutton > * {
    vertical-align: middle;
}

td.schedgrey, td.oddschedgrey, td.oddexpandschedgrey, td.formdataschedgrey {
    background-color: #C0C0C0!important;
}

td.schedred, td.oddschedred, td.oddexpandschedred, td.formatdataschedred {
    background-color: #F48E86!important;
}

td.schedamber, td.oddschedamber, td.oddexpandschedamber, td.formdataschedamber {
    background-color: #FBDB90!important;
}

td.schedgreen, td.oddschedgreen, td.oddexpandschedgreen, td.formdataschedgreen {
    background-color: #A6CB85!important;
}

td.schedyellow, td.oddschedyellow, td.oddexpandschedyellow, td.formdataschedyellow {
    background-color: #FFFF00!important;
}

*.coins_darkgray, td.coins_darkgrey, *.coins_darkgray, td.coins_darkgrey {
    background-color: #828282!important;
    color: #FFFFFF;
}

td.expired {
    background-color: #F48E86!important;
}

td.blue{
    background-color: #B5CEE7!important;
}

TD.treelink {
    font-size: 12px;
}

TD.treelinkhi {
    background-color: rgba(66,73,88,0.1)!important;
    color: #2a2a2a;
    font-size: 12px;
}

TR.odd > TD.buttons button.buttonanchor,
TR.even > TD.buttons button.buttonanchor {
    vertical-align: middle;
}

TR.odd > TD.buttons > .buttonanchor,
TR.even > TD.buttons > .buttonanchor {
    margin-right: 4px;
}

TR.odd > TD.buttons > .buttonanchor:last-child,
TR.even > TD.buttons > .buttonanchor:last-child {
    margin-right: 0;
}

div.sortimage img {
    height: 18px;
    width: 18px;
    margin-top: 4px;
}

td.buttonbar td.buttonbar {
    background-color: #ffffff;
    padding: 0 10px;
    height: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}

td.buttonbar td.buttonbar:last-of-type {
    justify-content: flex-end;
    align-self: flex-end;
    margin-left: auto;
    margin-right: 0;
}

#footerrow {
    border-top: 3px solid rgba(0,0,0,0.1);
}

td.filterbar, td.filterbar td.buttonbar {
    background-color: #ffffff;
}

td.buttonbar td.buttonbar > *:first-child {
    margin-top: 8px!important;
    margin-bottom: 8px!important;
}

td.buttonbar td.buttonbar > *:last-child {
    margin-top: 8px!important;
    margin-bottom: 8px!important;
}

td.buttonbar td.buttonbar > #audit:last-child {
    margin-left: 10px!important;
}

td.buttonbar button, 
button.text-image-button, 
div.ui-dialog-buttonset button, 
div.ui-dialog-buttonset .ui-state-default, input[type='button'], 
a button.buttonanchor {
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.1);
    height: 24px;
    background-color: #ffffff;
    margin: 0;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    color: #2a2a2a;
    text-transform: capitalize!important;
    padding: 0 8px!important;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    transition: .3s;
    cursor: pointer;
    margin-right: 4px;
}

a.buttonanchor {
    text-decoration: none;
}

button.text-image-button img,
td.buttonbar button img,
div.ui-dialog-buttonset button img {
    height: 18px;
    width: auto;
    margin-left: -6px;
    margin-right: 2px;
}

td.buttonbar button.text-image-button.image-only,
div.ui-dialog-buttonset button.text-image-button.image-only {
    padding-right: 0!important;
}

td.buttonbar button:hover,
button.text-image-button:hover,
div.ui-dialog-buttonset button:hover,
input[type='button']:hover,
a.buttonanchor button:hover,
tr.activerow a button.buttonanchor:hover {
    background-color: rgba(66,73,88,0.1);
    border-width: 1px;
}

.ui-state-hover,
.ui-widget-content .ui-state-hover,
.ui-widget-header .ui-state-hover,
.ui-state-focus,
.ui-widget-content .ui-state-focus,
.ui-widget-header .ui-state-focus,
.ui-button:hover, .ui-button:focus {
    font-weight: 700;
    color: #2a2a2a;
    background-color: rgba(66,73,88,0.1);
    border: 1px solid rgba(0,0,0,0.1);
}

button.buttonanchor.image-button {
    padding: 0!important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

button.buttonanchor.image-button > img.button {
    height: 18px;
    width: 18px;
    margin: 0;
    padding: 0;
}

button.buttonanchor.text-image-button.image-only {
    width: 24px;
    padding: 0 5px!important;
}

button.buttonanchor.image-button > img.button:hover {
    background: transparent!important;
}

div.buttongroup {
    border: none;
    display: inline-flex;
    margin-right: 3px;
}

div.buttongroup .image-button {
    padding: 0!important;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0,0,0,0.1)!important;
    border-radius: 4px!important;
}

td.buttonbar div.buttongroup.selected button {
    border: 1px solid transparent;
}

td.filterbar td.buttonbar .styled-select {
    margin-right: 3px;
}

td.filterbar td.buttonbar .styled-select:last-of-type {
    margin-right: 0;
}

div.buttongroup .image-button img {
    margin: 0;
}

div.buttongroup .image-button img:hover {
    background-color: transparent!important;
}

button#filterDelete {
    padding-right: 0 !important;
}

div.actiongroup {
    justify-self: flex-end;
    margin-left: 0;
    height: 24px;
    box-sizing: border-box;
    padding: 0;
    background: none;
    border: none;
    display: inline-flex;
    align-items: center;
}

div.actiongroup:hover,
td.buttonbar div.actiongroup:hover button {
    background: none;
}

td.buttonbar div.actiongroup div.styled-select {
    zoom: 1;
    height: 24px;
    width: 200px;
    background-color: rgba(66,73,88,0.1)!important;
    background-image: none!important;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 2px;
    box-sizing: border-box;
    transition: .3s;
}

td.buttonbar div.actiongroup div.styled-select select {
    border: none;
    background-image: none;
    background-color: transparent!important;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
}

td.buttonbar div.actiongroup div.styled-select:hover {
    border-color: #4a4a4a;
}

td.buttonbar div.actiongroup #actiongo {
    border: 1px solid rgba(0,0,0,0.1);
    background-color: #ffffff;
    margin-left: 4px!important;
    display: inline-flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    padding: 0 !important;
    transition: .3s;
}

td.buttonbar div.actiongroup #actiongo:hover {
    background-color: rgba(66,73,88,0.1);
}

td.buttonbar div.actiongroup #actiongo img {
    margin: 0;
    width: 16px;
    height: 16px;
}

#reload.buttonanchor {
    margin-right: 4px!important;
}

td.select > a,
td.selected > a {
    display: block;
    width: 16px;
    height: 16px;
    background: transparent;
    border-radius: 2px;
    outline: none;
    margin: 0 auto!important;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: .3s;
    position: relative;
    z-index: 1;
    cursor: default;
}

td.selected > a:after {
    content: '\e9da';
    position: absolute;
    z-index: 2;
    pointer-events: none;
    top: -5px;
    left: -4px;
    font-size: 24px;
    color: #ffffff;
    font-family: "iCoins" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

td.select > a > img,
td.selected > a > img {
    width: 16px;
    height: 16px;
    display: block;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 2px;
    padding: 7px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    transition: .3s;
}

.mode-dark td.select > a > img {
    border-color: rgba(255,255,255,0.5);
}

td.select > a > img[id=""] {
    border: none;
    cursor: default;
    background: transparent;
}

td.select > a:hover > img {
    border-color: #2a2a2a;
}

td.selected > a > img {
    background: #4a4a4a;
    border-color: #2a2a2a;
}

tr.activerow td.select > a > img:hover {
    background: #ffffff;
}

tr.activerow td.selected > a > img:hover {
    background: #4a4a4a;
}

tr.activerow img:hover {
    border-radius: 2px;
    background-color: rgba(66,73,88,0.1);
}


.floatThead-wrapper > .floatThead-container {
    z-index: 2!important;
}

td.filterbar, td.filter {
    border-top: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 8px 8px 8px 10px;
    background-color: #ffffff;
}

TD.buttonbar {
    border-top: none;
    height: auto;
    padding: 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    background-image: none;
    background: #ffffff;
}

TD.buttonbar > table > tbody > tr {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: flex-start;
}

td.filterbar td.buttonbar {
    border-bottom: none;
    padding-right: 2px;
}

div.buttongroup button,
div.buttongroup button:hover {
    border-radius: 3px;
}

td.buttonbar #filterSave {
    padding: 0 2px!important;
}

td.buttonbar #filterSave img {
    margin: 0;
}

TD.buttonbar > IMG {
    margin: 0 8px 0 6px;
}

.mode-dark TD.buttonbar > IMG {
    filter: invert(1);
}

TD.buttonbar > IMG:last-of-type {
    display: none;
}

TD.buttonbar span.filterlabel {
    color:#767676;
}

td.buttonbar button:focus,
button.text-image-button:focus,
div.ui-dialog-buttonset button:focus {
    border-width: 1px;
    margin: 0 4px 0 0!important;
    background-color: rgba(66,73,88,0.1);
}

.styled-select select {
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 2px;
    background: #ffffff;
    padding: 4px 24px 4px 1px;
    background-image: none;
    height: 24px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    transition: .3s;
}

.styled-select select option {
    background: #ffffff!important;
    color: #2a2a2a!important;
}

.styled-select select:hover {
    border-color: #4a4a4a;
}

.styled-select select:focus-within {
    border-color: #767676;
}

.styled-select select.readonly {
    background-color: #ffffff;
    color: #767676;
}

.styled-select select[disabled] {
    background-color: rgba(66,73,88,0.1);
    color: #767676;
}

.styled-select select[disabled]:hover {
    border-color: rgba(0,0,0,0.1);
}

INPUT[type='text'],
INPUT[type='password'],
TEXTAREA, .ui-multiselect {
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 2px;
    background: #ffffff;
    padding: 4px 1px!important;
    background-image: none;
    height: 24px;
    box-sizing: border-box;
    outline: none!important;
    transition: .3s;
}

TEXTAREA,
.ui-multiselect {
    height: auto;
}

INPUT[type='text']:hover,
INPUT[type='password']:hover,
TEXTAREA:hover, .ui-multiselect:hover {
    border-color: #4a4a4a;
}

INPUT:hover, TEXTAREA:hover {
    background-color: #ffffff;
}

INPUT[type='text']:focus,
INPUT[type='password']:focus,
TEXTAREA:focus, .ui-multiselect:focus {
    border-color: #767676;
    background: #ffffff;
}

td#applyFilter {
    width: 28px!important;
    border: none!important;
    border-bottom: 1px solid rgba(0,0,0,0.1)!important;
    border-left: 1px solid rgba(0,0,0,0.1)!important;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    background-color: #ffffff!important;
}

td#applyFilter img {
    margin: 0;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 3px;
    box-sizing: border-box;
    transition: .3s;
}

td#applyFilter:hover img {
    background-color: rgba(66,73,88,0.1);
}

td.button_h#applyFilter:hover {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    background: transparent;
}

td.filterbar #queryColumnFilter {
    width: 200px;
    margin-left: 1px;
}

html.mainarea {
    background-color: #ffffff;
}

.buttonanchor.text-image-button#refresh {
    margin-left: 4px;
    margin-right: 0;
}

/* input errors */
INPUT.error,
TEXTAREA.error,
SELECT.error,
.ui-multiselect.error {
    border-color: #ed0034!important;
    background-image: none;
}

INPUT.mandatory,
TEXTAREA.mandatory,
SELECT.mandatory,
.ui-multiselect.mandatory,
.styled-select.mandatory select {
    background-color: #EFF4FA!important;
}

.mode-dark INPUT.mandatory,
.mode-dark TEXTAREA.mandatory,
.mode-dark SELECT.mandatory,
.mode-dark .ui-multiselect.mandatory,
.mode-dark .styled-select.mandatory select {
    background-color: rgba(66,73,88,0.1)!important;
}

INPUT.disabled {
    background-color: rgba(66,73,88,0.1)!important;
    cursor: default;
    border-color: rgba(0,0,0,0.1)!important;
}

INPUT.decdisabled, INPUT.intdisabled {
    background-color: rgba(66,73,88,0.1)!important;
    border-color: rgba(0,0,0,0.1)!important;
    cursor: default;
}

INPUT.disabled:hover {
    border-color: rgba(0,0,0,0.1);
}

input[type='button'][disabled='disabled'], input[type='button'][disabled='disabled']:hover {
    background-color: rgba(66,73,88,0.1);
    color: #767676;
    cursor: default;
}

button.image-button, input[type='button'] {
    border-width: 1px;
    border-radius: 2px;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    max-width: 24px;
    max-height: 24px;
}

input[type='button'] {
    width: auto;
    max-width: initial;
    padding: 0 4px!important;
}

INPUT[type='text'] + button.image-button,
INPUT[type='password'] + button.image-button,
TEXTAREA + button.image-button,
.ui-multiselect + button.image-button,
INPUT[type='text'] + input[type='button'],
INPUT[type='password'] + input[type='button'],
TEXTAREA + input[type='button'],
.ui-multiselect + input[type='button'] {
    margin-left: 4px;
}

INPUT[type='file'] {
    border-color: transparent;
    background-color: transparent;
    height: 22px;
    margin-left: -3px;
}

INPUT[type='file']:hover {
    background-color: transparent;
}

input.disabledchanged {
    border-color: #e54d42!important;
}


/* Dialog buttons  */
div.ui-dialog-buttonset button.text-image-button {
    padding: 0 8px!important;
    margin: 0 4px 0 0!important;
}

div.ui-dialog-buttonset button.text-image-button:last-child {
    margin-right: 0 !important;
}


table.filled {
    min-height: 24px;
}

A {
    color: #2a2a2a;
}

/* Colour palettes fixes */
TD.formexpanddata {
    padding-left: 2px;
    padding-bottom: 4px;
}

TD.formexpanddata > div:not([class]) {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    position: relative;
}

TD.formexpanddata > div:not([class]) > input {
    width: 100%;
}

TD.formexpanddata > div:not([class]) > .evo-pop {
    top: calc(100% + 2px);
}

input[type='checkbox']+var.formexpandlabel {
    vertical-align: middle;
}

VAR.formexpandlabel {
    margin-right: 4px;
    margin-left: 4px;
    padding: 0;
}

.evo-colorind, .evo-colorind-ie, .evo-colorind-ff {
    width: 24px;
    min-width: 24px;
    max-width: 24px;
    height: 24px;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 2px;
}

.evo-colorind {
    top: 0;
    margin-left: 0px;
    left: 2px;
}

.codemirror-controls + .textarea-wrapper {
    margin-top: 4px;
}

img.button:not(#browseBusy) {
    height: 18px;
    width: 18px;
    padding: 3px;
}

img#browseBusy {
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
}

nobr {
    display: inline-flex;
    align-items: center;
    text-decoration: inherit; /* workaround for a > nobr in Firefox */
}

/* Dispatch inner page  */
button.SnD-toolbar-button {
    font-size: 12px !important;
    margin-bottom: 6px!important;
    margin-top: 6px !important;
    vertical-align: middle;
}

TD.buttonbar > button.SnD-toolbar-button:first-child {
    margin-left: 10px!important;
}

input.dhx_timeline_input {
    margin: 2px 2px 0px 4px;
    height: 16px;
    padding: 1px !important;
}

.ui-layout-resizer.ui-layout-resizer-south-closed {
    bottom: 20px!important;
}

/* S&D schedule board styles */
.dhtmlx_skin_dhx_terrace div.dhtmlx_window_active {
    border-radius: 0!important;
}

.dhtmlx_skin_dhx_terrace div.dhtmlx_window_active div.dhtmlx_wins_body_outer {
    border-radius: 0!important;
    background-image: none!important;
    background: #4a4a4a;
}

.dhtmlx_skin_dhx_terrace div.dhtmlx_window_active div.dhtmlx_wins_body_outer div.dhtmlx_wins_body_inner {
    background: #ffffff;
}

.dhtmlx_skin_dhx_terrace div.dhtmlx_wins_body_inner .dhxform_obj_dhx_terrace {
    background: #ffffff;
}

.dhxform_obj_dhx_terrace div.dhxform_base,
.dhxform_obj_dhx_terrace div.dhxform_btn td.btn_m div.btn_txt,
.dhxform_obj_dhx_terrace div.dhxform_btn td.btn_l div.btn_l, .dhxform_obj_dhx_terrace div.dhxform_btn td.btn_r div.btn_r {
    color: #2a2a2a!important;
}

.dhxform_obj_dhx_terrace div.dhxform_txt_label2 {
    color: #2a2a2a!important;
}

div.dhtmlxLayoutPolyProgressBGIMGGlobal_dhx_terrace {
    background-color: rgba(66,73,88,0.1)!important;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_btn,
.dhx_toolbar_base_24_dhx_terrace div.dhx_toolbar_btn,
.dhx_toolbar_base_32_dhx_terrace div.dhx_toolbar_btn,
.dhx_toolbar_base_48_dhx_terrace div.dhx_toolbar_btn {
    background-image: none!important;
    display: inline-flex;
    align-items: center;
    height: 24px!important;
    box-sizing: border-box;
    border-top: 1px solid rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.1);
    border-color: rgba(0,0,0,0.1)!important;
    background-color: #ffffff;
    color: #2a2a2a!important;
    transition: .3s;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_btn.pres,
.dhx_toolbar_base_24_dhx_terrace div.dhx_toolbar_btn.pres,
.dhx_toolbar_base_32_dhx_terrace div.dhx_toolbar_btn.pres,
.dhx_toolbar_base_48_dhx_terrace div.dhx_toolbar_btn.pres {
    background-color: rgba(66,73,88,0.1)!important;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_btn.over,
.dhx_toolbar_base_24_dhx_terrace div.dhx_toolbar_btn.over,
.dhx_toolbar_base_32_dhx_terrace div.dhx_toolbar_btn.over,
.dhx_toolbar_base_48_dhx_terrace div.dhx_toolbar_btn.over {
    background-color: rgba(66,73,88,0.1)!important;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_btn img {
    width: 14px!important;
    height: 14px!important;
}

.mode-dark .dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_btn img {
    filter: invert(1);
}

.mode-dark .dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_btn img[src*="filter_12.png"] {
    filter: invert(0);
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_btn img,
.dhx_toolbar_base_24_dhx_terrace div.dhx_toolbar_btn img,
.dhx_toolbar_base_32_dhx_terrace div.dhx_toolbar_btn img,
.dhx_toolbar_base_48_dhx_terrace div.dhx_toolbar_btn img {
    margin: 1px 0 0 0!important;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_btn div,
.dhx_toolbar_base_24_dhx_terrace div.dhx_toolbar_btn div,
.dhx_toolbar_base_32_dhx_terrace div.dhx_toolbar_btn div,
.dhx_toolbar_base_48_dhx_terrace div.dhx_toolbar_btn div {
    font-family: Lato, helvetica, verdana, arial, sans-serif!important;
    font-weight: 700;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_arw,
.dhx_toolbar_base_24_dhx_terrace div.dhx_toolbar_arw,
.dhx_toolbar_base_32_dhx_terrace div.dhx_toolbar_arw,
.dhx_toolbar_base_48_dhx_terrace div.dhx_toolbar_arw {
    height: 24px!important;
    line-height: 24px!important;
    border: 1px solid rgba(0,0,0,0.1);
    border-color: rgba(0,0,0,0.1)!important;
    border-left: 0;
    box-sizing: border-box;
    border-top-right-radius: 3px!important;
    border-bottom-right-radius: 3px!important;
    background-color: #ffffff;
    background-image: none!important;
    transition: .3s;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_arw.over,
.dhx_toolbar_base_24_dhx_terrace div.dhx_toolbar_arw.over,
.dhx_toolbar_base_32_dhx_terrace div.dhx_toolbar_arw.over,
.dhx_toolbar_base_48_dhx_terrace div.dhx_toolbar_arw.over {
    background-color: rgba(66,73,88,0.1)!important;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_arw div.arwimg,
.dhx_toolbar_base_24_dhx_terrace div.dhx_toolbar_arw div.arwimg,
.dhx_toolbar_base_32_dhx_terrace div.dhx_toolbar_arw div.arwimg,
.dhx_toolbar_base_48_dhx_terrace div.dhx_toolbar_arw div.arwimg {
    height: 24px!important;
    background-position: 0px -5px!important;
    background: transparent;
    box-sizing: border-box;
    border-right: 0;
}

.dhx_toolbar_base_18_dhx_terrace div.dhx_toolbar_text {
    color: #2a2a2a!important;
}

div.dhx_toolbar_poly_18_dhx_terrace,
div.dhx_toolbar_poly_24_dhx_terrace,
div.dhx_toolbar_poly_32_dhx_terrace,
div.dhx_toolbar_poly_48_dhx_terrace {
    background-color: #ffffff!important;
    border: 1px solid rgba(0,0,0,0.1)!important;
    border-radius: 2px!important;
    box-shadow: none!important;
}

div.dhx_toolbar_poly_18_dhx_terrace td.td_btn_txt div.btn_sel_text,
div.dhx_toolbar_poly_24_dhx_terrace td.td_btn_txt div.btn_sel_text,
div.dhx_toolbar_poly_32_dhx_terrace td.td_btn_txt div.btn_sel_text,
div.dhx_toolbar_poly_48_dhx_terrace td.td_btn_txt div.btn_sel_text {
    color: #2a2a2a!important;
}

div.dhx_toolbar_poly_18_dhx_terrace table.buttons_cont tr.tr_btn.tr_btn_over,
div.dhx_toolbar_poly_24_dhx_terrace table.buttons_cont tr.tr_btn.tr_btn_over,
div.dhx_toolbar_poly_32_dhx_terrace table.buttons_cont tr.tr_btn.tr_btn_over,
div.dhx_toolbar_poly_48_dhx_terrace table.buttons_cont tr.tr_btn.tr_btn_over,
div.dhx_toolbar_poly_18_dhx_terrace table.buttons_cont tr.tr_btn.tr_btn_selected,
div.dhx_toolbar_poly_24_dhx_terrace table.buttons_cont tr.tr_btn.tr_btn_selected,
div.dhx_toolbar_poly_32_dhx_terrace table.buttons_cont tr.tr_btn.tr_btn_selected,
div.dhx_toolbar_poly_48_dhx_terrace table.buttons_cont tr.tr_btn.tr_btn_selected {
    background-color: rgba(66,73,88,0.1)!important;
}

.dhxform_obj_dhx_terrace input.dhxform_textarea,
.dhxform_control .dhx_combo_box.dhx_terrace {
    height: 24px!important;
    box-sizing: border-box;
    padding: 4px 1px!important;
    font-family: Lato, helvetica, verdana, arial, sans-serif!important;
    border-color: rgba(0,0,0,0.1)!important;
    border-radius: 2px!important;
    transition: .3s;
}

.dhxform_obj_dhx_terrace input.dhxform_textarea:hover,
.dhxform_control .dhx_combo_box.dhx_terrace:hover,
.dhxform_control .dhx_combo_box.dhx_terrace:focus-within {
    border-color: #4a4a4a!important;
}

.dhxform_control .dhx_combo_box.dhx_terrace > .dhx_combo_input {
    border: none!important;
    padding-right: 12px !important;
}

.dhxform_obj_dhx_terrace div.dhxform_item_label_left {
    display: flex;
    align-items: center;
}

.dhxform_obj_dhx_terrace div.dhxform_item_label_left div.dhxform_control {
    flex: 1;
    min-width: 230px;
}

.dhtmlx_window_active .dhxform_obj_dhx_terrace div.dhxform_item_label_left div.dhxform_control {
    min-width: 0;
}

.dhxform_obj_dhx_terrace div.dhxform_item_label_left div.dhxform_control > input,
.dhxform_obj_dhx_terrace div.dhxform_item_label_left div.dhxform_control > span > div {
    width: 100% !important;
}

.dhxform_obj_dhx_terrace,
.dhxform_obj_dhx_terrace div.dhxform_label.dhxform_label_align_right label {
    font-family: Lato, helvetica, verdana, arial, sans-serif!important;
}

.dhxform_obj_dhx_terrace div.dhxform_btn {
    height: 24px!important;
    font-family: Lato, helvetica, verdana, arial, sans-serif!important;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer!important;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.1);
    transition: .3s;
}

.disabled div.dhxform_btn {
    opacity: 0.65;
    cursor: default!important;
    pointer-events: none;
}

.dhxform_obj_dhx_terrace div.dhxform_btn:hover {
    background: rgba(66,73,88,0.1);
}

.dhxform_obj_dhx_terrace div.dhxform_btn td.btn_l,
.dhxform_obj_dhx_terrace div.dhxform_btn td.btn_r {
    background-image: none!important;
}

.dhxform_obj_dhx_terrace div.dhxform_btn td.btn_m {
    background-image: none!important;
}

.combo_dhx_terrace_sel {
    color: #2a2a2a!important;
    background-color: rgba(66,73,88,0.1)!important;
}

table.dhtmlxLayoutPolyContainer_dhx_terrace td.dhtmlxLayoutSinglePoly {
    background-color: rgba(0,0,0,0.1)!important;
}

.dhx_matrix_scell,
.dhx_assigned_column {
    border-color: rgba(0,0,0,0.1)!important;
}

.dhx_matrix_scell, .dhx_matrix_cell {
    border-bottom: 1px solid rgba(0,0,0,0.1)!important;
    border-right: 1px solid rgba(0,0,0,0.1)!important;
}

.dhx_title_assigned {
    border-color: rgba(0,0,0,0.1)!important;
    color: #2a2a2a!important;
}

.dhx_scale_label_assigned .dhx_assigned_column {
    border-left: 1px solid rgba(0,0,0,0.1)!important;
    border-right: 1px solid rgba(0,0,0,0.1)!important;
}

.dhx_border_assigned {
    border-color: transparent!important;
}

.dhx_resource_text_right {
    color: #767676!important;
}

.scheduler_day_menu_btn,
.dhx_cal_header div div {
    border-color: rgba(0,0,0,0.1)!important;
}

.scheduler_day_menu_btn:hover {
    background-color: rgba(66,73,88,0.1);
}

.mode-dark .scheduler_day_menu_btn {
    filter: invert(1);
}

.mode-dark .scheduler_day_menu_btn {
    border-color: #2a2a2a!important;
}

.dhx_matrix_cell {
    background-color: #ffffff!important;
}

.dhx_matrix_cell.time_out_cell {
    background-color: rgba(66,73,88,0.1)!important;
}

.dhtmlXTooltip.tooltip {
    color: #767676!important;
    background-color: #ffffff!important;
    border-color: rgba(0,0,0,0.1)!important;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1)!important;
    text-shadow: none!important;
}

.mode-dark .dhx_resource_clock {
    filter: invert(1);
}

div.sd_win_popup {
    background-color: #ffffff!important;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1)!important;
    white-space: nowrap;
}

table.dhtmlxLayoutPolyContainer_dhx_terrace td.dhtmlxLayoutSinglePoly div.dhxcont_global_content_area {
    background-color: #ffffff!important;
}

.dhx_timeline_fixed {
    background-color: #ffffff!important;
    border-color: rgba(0,0,0,0.1)!important;
}

.x_section {
    background-color: #ffffff!important;
}

.dhx_matrix_cell > .time_out_cell {
    background-color: rgba(66,73,88,0.1)!important;
}

.dhtmlx_skin_dhx_terrace div.dhtmlx_window_active {
    box-shadow: 0px 10px 10px rgba(0,0,0,0.1);
}

div.dhtmlxMenu_dhx_terrace_SubLevelArea_Polygon {
    position: absolute;
    background-color: #ffffff!important;
    border: 1px solid rgba(0,0,0,0.1)!important;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.1)!important;
    border-radius: 3px!important;
}

div.dhtmlxMenu_dhx_terrace_SubLevelArea_Polygon table.dhtmlxMebu_SubLevelArea_Tbl div.sub_item_text {
    color: #2a2a2a!important;
}

div.dhtmlxMenu_dhx_terrace_SubLevelArea_Polygon table.dhtmlxMebu_SubLevelArea_Tbl tr.sub_item_selected {
    background-color: rgba(66,73,88,0.1)!important;
}

.dhxform_obj_dhx_terrace div.dhxform_label {
    color: #2a2a2a!important;
}

.dhxform_control > .dhxform_obj_dhx_terrace input.dhxform_textarea.coins_required,
.dhxform_control > .dhxform_obj_dhx_terrace textarea.dhxform_textarea.coins_required,
.coins_required > .dhxform_obj_dhx_terrace span.coins_required div.dhx_combo_box.dhx_terrace {
    border: 1px solid rgba(0,0,0,0.1)!important;
}

.dhxform_obj_dhx_terrace input.dhxform_textarea {
    background-color: #ffffff!important;
    color: #767676;
}

.dhxform_obj_dhx_terrace div.dhxform_control .dhx_combo_box.dhx_terrace .dhx_combo_input, .dhx_combo_list.dhx_terrace_list div {
    color: #2a2a2a!important;
}

.dhxform_obj_dhx_terrace span.coins_required div.dhx_combo_box.dhx_terrace {
    background-color: #ffffff!important;
}

.mode-dark img[src*="undo.svg"] {
    filter: invert(1);
}

.mode-dark INPUT.mandatory,
.mode-dark TEXTAREA.mandatory,
.mode-dark SELECT.mandatory,
.mode-dark .ui-multiselect.mandatory,
.mode-dark .styled-select.mandatory select {
    background-color: rgba(66,73,88,0.1)!important;
}

/* End Schedule and Dispatch */

.gmnoprint .gm-style-mtc button {
    font-size: 14px!important;
    background: #ffffff!important;
    height: 24px!important;
    color: #2a2a2a!important;
    transition: background .3s;
}

.gmnoprint .gm-style-mtc {
    background: #ffffff!important;
}

.gmnoprint .gm-style-mtc button:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

#mapToolbar {
    display: flex;
    align-items: center;
    background: #ffffff!important;
    top: 10px!important;
    right: 10px!important;
    border: none!important;
}

#mapToolbar > INPUT.cha {
    margin-top: 0!important;
    top: 0!important;
    border-color: rgba(0,0,0,0.1)!important;
    background-color: #ffffff!important;
}

#mapToolbar > INPUT.cha:hover {
    border-color: rgba(66,73,88,0.1)!important;
}

#mapToolbar > INPUT.cha:focus {
    border-color: #767676!important;
}

#mapToolbar button.image-button {
    border-radius: 0!important;
}

#mapToolbar button.image-button:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

.ms-parent {
    display: flex!important;
    align-items: center;
}

.ms-choice {
    height: 18px!important;
    border-color: rgba(0,0,0,0.1)!important;
    background-color: #ffffff!important;
    color: #2a2a2a!important;
}

.ms-choice:hover {
    border-color: rgba(66,73,88,0.1)!important;
}

.ms-choice:focus {
    border-color: #767676!important;
}

.gm-style .gm-style-mtc ul, .gm-style .gm-style-mtc li {
    border-color: rgba(0,0,0,0.1)!important;
    background-color: #ffffff!important;
    color: #2a2a2a!important;
}

.gm-style .gm-style-mtc li {
    display: flex;
    align-items: center;
    font-size: 14px!important;
}

.gm-style .gm-style-mtc li:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

.mode-dark .ssQIHO-checkbox-menu-item>span>span {
    filter: invert(1);
}

.gm-style .gm-style-mtc li label {
    margin-left: 4px;
}

#markerToolbar {
    background: #ffffff!important;
    border-color: rgba(0,0,0,0.1)!important;
}

.mode-dark #markerToolbar svg {
    filter: invert(1);
}

.gm-control-active {
    background: #ffffff!important;
    color: #2a2a2a!important;
    outline: none!important;
}

.mode-dark .gm-control-active img {
    filter: invert(1);
}

.gm-control-active + div {
    background-color: rgba(0,0,0,0.1)!important;
}

#mapToolbarVis {
    background: #ffffff!important;
    border-color: rgba(0,0,0,0.1)!important;
    color: #2a2a2a!important;
}

.mode-dark #mapToolbarVis input[type='checkbox'] {
    background-color: #ffffff!important;
}


div#browsepopup div#currentcolset {
    color: #2a2a2a;
    background-color: rgba(66,73,88,0.1);
    display: inline-flex;
    width: 100%;
    box-sizing: border-box;
    height: 33px;
    align-items: center;
    padding-top: 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

TD.formdataalert {
    padding-right: 6px;
}

TD.formdata > img {
    vertical-align: middle;
}

TD.formdata > var.data > img {
    margin-left: 0;
}

#rowbtnArinfo td.formdata {
    white-space: nowrap;
}

var.addtype {
    white-space: nowrap;
}

.mode-dark img[src*="notick.gif"] {
    opacity: 0.5;
}

img[src*="tick.gif"] {
    margin: 2px 4px;
    border-radius: 2px;
    background-color: transparent!important;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
}

.mode-dark img[src*="/tick.gif"] {
    border: 1px solid rgba(255,255,255,1);
}

tr.activerow img[src*="notick.gif"] {
    background-color: #ffffff!important;
}

.mode-dark .activerow img[src*="notick.gif"] {
    background-color: transparent!important;
}

/* S&D google map dark styles */
.ms-drop {
    background: #ffffff!important;
    color: #2a2a2a!important;
}

.ms-search input {
    border-color: rgba(0,0,0,0.1)!important;
    background: #ffffff!important;
    border-radius: 3px!important;
}

.ms-search input:hover {
    border-color: rgba(66,73,88,0.1)!important;
}

.ms-search input:focus {
    border-color: #767676!important;
}

.ms-search {
    padding: 8px 12px 2px!important;
}

.gm-style .gm-style-iw-c {
    background-color: #ffffff!important;
}

.gm-style .gm-style-iw-tc::after {
    background: #ffffff!important;
}

.mode-dark .gm-ui-hover-effect>span {
    filter: invert(1);
}

.gm-style .gm-style-iw-d::-webkit-scrollbar-track, .gm-style .gm-style-iw-d::-webkit-scrollbar-track-piece {
    background-color: #ffffff!important;
}

div.coins_popup div.coins_popup_area {
    background-color: #ffffff!important;
    box-shadow: 0 0 5px rgba(0,0,0,0.1)!important;
    border-color: rgba(0,0,0,0.1)!important;
}

.dhx_dataview_default_item, .dhx_dataview_default_item_selected {
    background-color: #ffffff!important;
}

.dhx_dataview .dhx_dataview_default_item, .dhx_dataview .dhx_dataview_default_item_selected {
    border-color: rgba(0,0,0,0.1)!important;
}

tr.lookupresulthi {
    background-color: rgba(66,73,88,0.1)!important;
}


/* S&D calendar */
.dhtmlxcalendar_container.dhtmlxcalendar_skin_dhx_terrace {
    background-color: #ffffff!important;
    background-image: none!important;
}

.dhtmlxcalendar_container.dhtmlxcalendar_skin_dhx_terrace div.dhtmlxcalendar_month_cont ul.dhtmlxcalendar_line li.dhtmlxcalendar_cell.dhtmlxcalendar_month_hdr span.dhtmlxcalendar_month_label_month,
.dhtmlxcalendar_container.dhtmlxcalendar_skin_dhx_terrace div.dhtmlxcalendar_month_cont ul.dhtmlxcalendar_line li.dhtmlxcalendar_cell.dhtmlxcalendar_month_hdr span.dhtmlxcalendar_month_label_year {
    color: #2a2a2a!important;
}

.dhtmlxcalendar_container.dhtmlxcalendar_skin_dhx_terrace div.dhtmlxcalendar_days_cont ul.dhtmlxcalendar_line li.dhtmlxcalendar_cell,
.dhtmlxcalendar_container.dhtmlxcalendar_skin_dhx_terrace div.dhtmlxcalendar_days_cont ul.dhtmlxcalendar_line li.dhtmlxcalendar_cell_first {
    color: #2a2a2a!important;
}

.dhtmlxcalendar_container.dhtmlxcalendar_skin_dhx_terrace {
    box-shadow: 1px 1px 6px rgba(0,0,0,0.1)!important;
}

.dhtmlxcalendar_container.dhtmlxcalendar_skin_dhx_terrace div.dhtmlxcalendar_dates_cont ul.dhtmlxcalendar_line li.dhtmlxcalendar_cell {
    color: #2a2a2a!important;
}

.dhtmlxcalendar_container div.dhtmlxcalendar_dates_cont ul.dhtmlxcalendar_line li.dhtmlxcalendar_cell.dhtmlxcalendar_cell_month_weekend {
    color: #767676!important;
}

.dhtmlxcalendar_container div.dhtmlxcalendar_days_cont ul.dhtmlxcalendar_line li.dhtmlxcalendar_cell.dhtmlxcalendar_day_weekday_cell {
    color: #767676!important;
}

.drag-snippet {
    background-color: #ffffff!important;
    color: #2a2a2a!important;
    border: 1px solid rgba(0,0,0,0.1)!important;
}



/* Sub header restyle */
.sub-header, .tab-header, .drop-header, .nav-header {
    box-shadow: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    background-color: #ffffff;
    padding: 6px 0;
    box-sizing: border-box;
    height: 42px!important;
    max-width: 100%;
    display: flex;
    align-items: center;
}

table.popitem td {
    height: auto;
    padding: 0;
}

.sub-header div.tab, .tab-header div.tab, .sub-header div.groupselect, .tab-header div.tabmenu, .nav-header div.tab {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    padding: 4px 8px!important;
    border-radius: 4px;
    transition: color .3s;
    top: auto!important;
    display: inline-flex;
    align-items: center;
    position: static!important;
    margin-left: 6px;
}

.sub-header div.tab > sub,
.tab-header div.tab > sub,
.sub-header div.groupselect > sub,
.tab-header div.tabmenu > sub,
.nav-header div.tab > sub {
    margin-top: 8px;
    margin-right: 3px;
}

.sub-header > .styled-select, .tab-header > .styled-select, .drop-header > .styled-select, .nav-header > .styled-select {
    overflow: visible;
    margin-left: 6px;
}

.sub-header a, .tab-header a, .drop-header a, .nav-header a {
    text-decoration: none!important;
    outline: none;
}

.sub-header div.tab > .buttonanchor.image-button,
.tab-header div.tab > .buttonanchor.image-button,
.nav-header div.tab > .buttonanchor.image-button {
    width: 18px;
    height: 18px;
    margin-left: 4px;
}

.tab-header div.tab, .tab-header div.tabmenu {
    padding: 2px 8px 4px 8px!important;
}

.tab-header > *:last-child {
    margin-right: 75px;
}

.sub-header > *:first-child, .tab-header > *:first-child, .drop-header > *:first-child, .nav-header > *:first-child {
    margin-left: 0;
}

.sub-header div.tab.on, .nav-header div.tab.on, .tab-header div.tab.on,
.sub-header div.tabmenu.on, .nav-header div.tabmenu.on, .tab-header div.tabmenu.on {
    background-color: rgba(66,73,88,0.1);
    color: #2a2a2a;
}

.sub-header div:not(.on):hover, .nav-header div:not(.on):hover, .tab-header div:not(.on):hover {
    box-shadow: none;
    color: #2a2a2a;
}

.sub-header-tracker, .tab-header-tracker, .nav-header-tracker {
    display: none;
}

.sub-header div.tab,
.tab-header div.tab,
.sub-header div.groupselect,
.tab-header div.tabmenu,
.nav-header div.tab {
    color: #767676;
}

select.tabgroup {
    margin-left: 6px;
}

/* cmdbarcontainer */
div.cmdbarcontainer {
    background: #ffffff;
    padding: 4px 0 4px 4px;
    margin: -1px;
    width: calc(100% + 2px);
    box-sizing: border-box;
}

div.cmdbardiv,
div.cmdbardiv .cmdbarbut {
    cursor: pointer;
}

div.cmdbardiv.cmdbardropdown,
div.cmdbardiv.cmdbardropdown .cmdbarbut {
    cursor: default;
}

button.cmdbarbut {
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
}

.cmdbaricon {
    font-size: 12px;
    top: 0;
    padding-right: 6px;
}

.cmdbaricon.fa-mobile {
    font-size: 15px;
}

.cmdbarcaret {
    padding-left: 6px;
    font-size: 12px;
}

button.cmdbarbut,
.cmdbardropitem {
    background: #ffffff;
    color: #2a2a2a;
    border-color: rgba(0,0,0,0.1);
    border-radius: 3px;
}

.cmdbaricon,
.cmdbardropitem a {
    color: #2a2a2a;
}

.cmdbardropitem > a {
    display: flex;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0,0,0,0.1);
}

.cmdbardropitem .cmdbardivider + a,
.cmdbardropitem > a:first-child {
    border-top: none;
}

.cmdbardivider {
    margin: 6px 12px;
    border-top: 1px solid rgba(0,0,0,0.1);;
}

button.cmdbarbut:hover,
.cmdbardropitem a:hover {
    background: rgba(66,73,88,0.1);
}


/* Timeline window */
.timeline-window {
    background-color: #ffffff;
}

.timeline-title-div {
    border-bottom-color: rgba(0,0,0,0.1);
    padding: 0 4px 12px 4px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.timeline-title-icon {
    color: #767676!important;
}

button.timeline-button {
    background: #ffffff;
    color: #2a2a2a;
    border-color: rgba(0,0,0,0.1);
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    transition: .3s;
    cursor: pointer;
}

button.timeline-button:hover {
    background: rgba(66,73,88,0.1)!important;
}

div.timeline-butdiv {
    padding: 0px 2px 0px 2px!important;
}

div.timeline-butdiv:not(.timeline-dropdown) .timeline-button {
    cursor: pointer!important;
}

.timeline-button-icon,
.timeline-selsort {
    color: #2a2a2a;
    font-size: 12px;
    top: 0;
    padding-right: 6px;
}

.timeline-dropitem {
    background: #ffffff;
    color: #2a2a2a;
    border-color: rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
}

.timeline-dropitem a {
    border-radius: 0!important;
    color: #2a2a2a;
    display: flex;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0,0,0,0.1);
    transition: .3s;
}

.timeline-dropitem a:first-child {
    border-top: 0;
}

.timeline-dropitem a:hover {
    background: rgba(66,73,88,0.1);
}

.timeline-inner .timeline-item .timeline-content {
    background: #ffffff;
    color: #2a2a2a;
}

.theme-main-color,
.theme-main-background {
    color: #767676!important;
}

.timeline-card,
.timeline-date-span {
    background: #ffffff;
    color: #2a2a2a;
}

.timeline-card-hover {
    background: rgba(66,73,88,0.1);
}

.timeline-item-action {
    background: rgba(66,73,88,0.1);
}

button.timeline-button:hover {
    background: rgba(66,73,88,0.1)!important;
}


/* Dialog windows */
.ui-widget.ui-widget-content {
    border: 1px solid rgba(0,0,0,0.1);
    outline: none;
}

div.systemalert {
    box-shadow: none;
    border: 0px;
    border-radius: 4px !important;
    overflow: hidden;
}

.mode-dark .ui-dialog {
    box-shadow: 0px 10px 20px #171717;
}

.ui-dialog .ui-dialog-content {
    background: #ffffff;
    color: #2a2a2a;
}

.ui-widget-content {
    background: #ffffff;
    color: #2a2a2a;
}

.ui-widget-overlay {
    opacity: 1!important;
    background-color: rgba(0,0,0,0.25);
}

.mode-dark .ui-widget-overlay {
    background-color: rgba(66,73,88,0.5);
}

div#dialog-extend-fixed-container {
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    background-color: #ffffff;
}



/* Dark mode styling */
body.treeview {
    background-color: #ffffff!important;
}

div.formcontainer {
    background-color: #ffffff;
}

TD.formbg TABLE {
    background-color: #ffffff!important;
}

iframe,
body.mode-dark {
    background-color: #ffffff;
}

td.rowdetailstab {
    background-color: #ffffff;
}

div.ui-tooltip-content {
    color: #2a2a2a;
}

td.contextform {
    background-color: #ffffff;
}

table.context {
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

tr.layoutrow > td {
    background-color: #ffffff;
}

td.formbg table.layout,
tr.layoutrow > td.formgrouplaynobox,
td[class^='formgrouplaynobox'] table,
td[class^='formgrouplay'] table {
    background: #ffffff;
}

td.formgrouplayicon i.layouticon,
td.formexpandgrouplayicon i.layouticon {
    color: #2a2a2a;
}

tr.layoutrow > td {
    border-color: rgba(0,0,0,0.1);
}

td.formgrouplayicon td.layouttitle, td.formexpandgrouplayicon td.layouttitle {
    border-bottom-color: rgba(0,0,0,0.1);
}

td.contextcoldivider {
    border-left: solid 1px rgba(0,0,0,0.1) !important;
}

td.contextcoldata:before {
    background: #ffffff;
}

button.image-button:hover {
    background-color: rgba(66,73,88,0.1);
}

td.formblock {
    background-color: #ffffff;
}

div.homepage,
div.homepage th.hptitle {
    background-color: #ffffff;
}

table.hplinkscontainer td {
    background-color: #ffffff;
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
    border-radius: 4px;
}

TD.contextdata {
    background-color: #ffffff;
}

td.filter td.formselectionblank,
TD.formselectionblank,
TD.formselectionlabel,
TD.formselectiondata {
    background-color: #ffffff;
    color: #2a2a2a;
}

td.formgroup td.layouttitle,
td.formexpandgroup td.layouttitle,
td.layoutbody td.formgroup td.layouttitle,
td.layoutbody td.formexpandgroup td.layouttitle {
    color: #2a2a2a;
}

tr.activerow button:hover,
tr.activerow a button:hover {
    background-color: rgba(66,73,88,0.1);
}

.menubody {
    border-radius: 3px;
    background-color: #ffffff;
}

.menuitem,
.menuitemover,
div.popupmenu div.option {
    background-color: #ffffff;
    color: #2a2a2a;
    border-color: rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    padding: 8px 12px;
}

.menuitemover {
    background-color: rgba(66,73,88,0.1);
}

.menuheader, div#browsepopup div.title, div#userpopup div.title {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    font-weight: 700;
}

td.rowdetailstab {
    position: relative;
}

div#drop-navigator {
    right: 0;
    background-color: #ffffff;
    padding-right: 2px;
    padding-left: 12px;
    padding-top: 2px;
    height: 28px;
}

div#sub-navigator {
    position: absolute;
    right: 0;
    background-color: #ffffff;
    padding-right: 2px;
    padding-left: 12px;
    padding-top: 2px;
    height: 28px;
    margin: 0;
    top: 8px;
}

.sub-header > div.tab:last-child {
    margin-right: 75px!important;
}

.sub-header > .tab[style*=none]:nth-last-child(n+1) {
    display: block!important;
    width: 0!important;
    padding: 0!important;
    font-size: 0;
    margin: 0;
}

.sub-header > a:last-child > div.tab,
.tab-header > a:last-child > div.tab,
.nav-header > a:last-child > div.tab {
    padding-right: 80px;
}

div#drop-navigator button,
div#sub-navigator button {
    border: 1px solid rgba(0,0,0,0.1);
    background-color: #ffffff;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #2a2a2a;
    font-weight: 700;
    margin-right: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: .3s;
}

div#drop-navigator button:hover,
div#sub-navigator button:hover {
    font-weight: 700;
    background-color: rgba(66,73,88,0.1);
}

.tox .tox-toolbar, .tox .tox-toolbar__overflow, .tox .tox-toolbar__primary,
.tox .tox-toolbar-overlord {
    background-color: #ffffff;
    background-image: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.tox-tinymce {
    border-color: rgba(0,0,0,0.1);
}

.mode-dark .tox .tox-tbtn svg {
    fill: #2a2a2a;
}

.tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type) {
    border-color: rgba(0,0,0,0.1);
}

.tox .tox-tbtn:hover {
    background-color: rgba(66,73,88,0.1);
    color: #2a2a2a;
}

TD.oddexpand, TD.oddexpandfixed,
td.expand {
    border-color: rgba(0,0,0,0.1);
}

TD.evenexpand, TD.evenexpandfixed {
    border-color: rgba(0,0,0,0.1);
}

.tox .tox-edit-area body {
    background-color: #ffffff;
    color: #2a2a2a;
}

.tox .tox-statusbar {
    background-color: #ffffff;
    border-top: 1px solid rgba(0,0,0,0.1);
    color: #767676;
}

.tox .tox-statusbar a, .tox .tox-statusbar__path-item, .tox .tox-statusbar__wordcount {
    color: #767676;
}

.mce-content-body {
    background-color: #ffffff!important;
}

table.popitem td {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
}

table.popitem td img.busy {
    left: calc(50% - 12px);
}

table.popitem td img.busy + nobr {
    opacity: .3;
}

.mode-dark table.popitem td img.busy {
    filter: invert(1);
}

div.popup, div.selectedpopup {
    background-color: #ffffff;
    border-left: 1px solid rgba(0,0,0,0.1);
    border-right: 1px solid rgba(0,0,0,0.1);
    padding: 0;
    box-shadow: none;
    box-sizing: border-box;
    width: auto!important;
    z-index: 2;
}

div.popup > .popitem tr,
div.selectedpopup > .popitem tr {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    height: 42px;
    box-sizing: border-box;
}

div.popup .popitem,
div.selectedpopup .popitem {
    display: block;
    box-sizing: border-box;
}

table.popitem td.icon {
    display: none;
}

table.popitem td.submenu {
    position: relative;
    width: 12px;
    height: 12px;
}

table.popitem td.submenu:after {
    content: "\e925";
    position: absolute;
    right: -6px;
    bottom: calc(50% - 1px);
    transform: translateY(50%);
    font-size: 20px;
    font-family: "iCoins" !important;
    font-style: normal;
    font-weight: bold;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    pointer-events: none;
    -webkit-font-smoothing: antialiased;
}

div.popup table.popitem td.submenu:after {
    transform: rotate(-90deg);
    bottom: -6px;
}

table.popitem td.submenu > img {
    opacity: 0;
}

div.popup.firstitem, div.selectedpopup.firstitem,
div.popup.lastitem, div.selectedpopup.lastitem {
    border-color: rgba(0,0,0,0.1);
}

div.popup:hover, div.selectedpopup:hover {
    background-color: #ffffff;
}

div.popup .popitem, div.selectedpopup .popitem {
    transition: background .3s;
    min-width: 200px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

div.popup.lastitem .popitem, div.selectedpopup.lastitem .popitem {
    border-bottom: none;
}

div.popup:hover .popitem, div.selectedpopup:hover .popitem {
    background-color: rgba(66,73,88,0.1);
}


/* Activity Wokrbench page theming  */
.webix_view,
.dhx_cal_container {
    background-color: #ffffff!important;
}

.webix_view{
    border-color: rgba(0,0,0,0.1)!important;
}

.webix_view.webix_menu-x.awbbutton {
    border: none;
    display: flex!important;
    align-items: center!important;
}

.webix_input_icon, .webix_view {
    box-sizing: border-box!important;
}

.webix_scroll_cont {
    display: flex;
    align-items: center;
}

.webix_scroll_cont > * {
    margin-top: 0!important;
}

.cardview-body .webix_scroll_cont {
    margin-bottom: 50px;
    flex-wrap: wrap;
    box-sizing: content-box!important;
}

.cardview-row-header {
    color: #2a2a2a;
}

.webix_view.webix_toolbar.webix_layout_toolbar {
    padding: 0 12px;
    box-sizing: border-box;
}

.awbbutton .webix_segment_0,
.awbbutton .webix_segment_1,
.awbbutton .webix_segment_N {
    background: #ffffff!important;
    color: #2a2a2a!important;
    border-radius: 3px!important;
    border-color: rgba(0,0,0,0.1)!important;
    line-height: 1!important;
    height: 24px!important;
    font-size: 12px!important;
    padding: 0 8px!important;
    margin-right: 4px !important;
    white-space: nowrap;
    transition: background .3s;
}

.awbbutton .webix_button {
    background: #ffffff!important;
    color: #2a2a2a!important;
    border-radius: 3px!important;
    border-color: rgba(0,0,0,0.1)!important;
    line-height: 1!important;
    height: 24px!important;
    font-size: 12px!important;
    padding: 0 8px!important;
    margin-right: 4px !important;
    white-space: nowrap;
    transition: background .3s;
}

.awbbutton .webix_list_item {
    background: #ffffff!important;
    color: #2a2a2a!important;
    border-radius: 3px!important;
    border-color: rgba(0,0,0,0.1)!important;
    line-height: 1!important;
    height: 24px!important;
    font-size: 12px!important;
    padding: 0 8px!important;
    margin-right: 4px !important;
    display: flex!important;
    align-items: center!important;
    white-space: nowrap;
    transition: background .3s;
}

.webix_el_group,
.webix_all_segments,
.webix_el_button .webix_el_box,
.webix_el_toggle .webix_el_box {
    display: flex!important;
    align-items: center!important;
    flex-wrap: wrap;
}

.webix_all_segments {
    flex-wrap: nowrap;
}

.diary_search_text,
.webix_el_box,
.webix_el_box > input {
    width: 100% !important;
}

.webix_el_box {
    padding: 0!important;
}

.webix_el_richselect .webix_el_box {
    display: inline-flex;
    align-items: center;
}

.webix_el_box > input {
    color: #2a2a2a;
    font-size: 12px;
}

.webix_el_box > input:placeholder {
    color: #767676;
}

.webix_el_box > input + span {
    padding-top: 3px!important;
    font-size: 18px;
    color: #767676;
}

.webix_list_item {
    background-color: #ffffff;
    color: #2a2a2a;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    transition: background .3s;
}

.webix_list_item.diary_user_item {
    width: 100% !important;
}

.webix_list_item:hover {
    background-color: rgba(66,73,88,0.1);
}

.webix_list .webix_list_item.webix_selected {
    background-color: rgba(66,73,88,0.1);
    color: #2a2a2a;
    border-color: rgba(0,0,0,0.1);
    box-shadow: none;
}

.cardview-tile {
    background-color: #ffffff!important;
    box-shadow: none!important;
    color: #767676!important;
}

.webix_dataview_item.tiles {
    border-color: rgba(0,0,0,0.1)!important;
}

.webix_dataview_item.tiles.webix_selected
{
    border: 1px solid #E09B00 !important;
}

.cardview-row-icon {
    border: none!important;
    padding-left: 0!important;
    box-shadow: none!important;
}

.cardview-row-text {
    padding-left: 0!important;
}

.cardview-dot {
    margin-left: 4px;
}

.webix_tooltip,
.webix_tooltip.awb_divtip_container {
    background-color: #ffffff!important;
    color: #767676!important;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 3px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1);
}

.webix_el_search .webix_el_box {
    display: flex;
    align-items: center;
}

.webix_el_search {
    margin-right: 4px;
}

.webix_el_search .webix_el_box input::placeholder {
    color: #767676!important;
    font-weight: 400;
}

.webix_el_search .webix_input_icon {
    padding-top: 8px !important;                                                                                                                                                                                                                                   
}

.dhx_cal_event_line_end {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

.dhx_cal_event_line_start {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.dhx_cal_event_clear {
    padding: 2px;
}

.diary_user_badge {
    width: 28px!important;
    height: 28px!important;
    top: 6px!important;
    color: #2a2a2a!important;
    background-color: #ffffff!important;
    margin-right: 6px!important;
}

.diary_user_inits {
    width: 24px!important;
    top: -2px!important;
    color: #2a2a2a!important;
}

.diary_user_namespan {
    top: 6px!important;
    color: #2a2a2a!important;
}

.webix_el_text input, .webix_el_search input, .webix_el_combo input, .webix_el_datepicker input, .webix_el_colorpicker input {
    height: 24px!important;
    color: #2a2a2a!important;
    background-color: #ffffff!important;
    font-size: 14px!important;
    border-radius: 2px!important;
    border: 1px solid rgba(0,0,0,0.1)!important;
    font-weight: 400!important;
}

.webix_el_text input:placeholder, .webix_el_search input:placeholder,
.webix_el_combo input:placeholder, .webix_el_datepicker input, .webix_el_colorpicker input:placeholder {
    color: #767676!important;
}

.webix_el_text input:hover, .webix_el_search input:hover,
.webix_el_combo input:hover, .webix_el_datepicker input, .webix_el_colorpicker input:hover {
    border-color: rgba(66,73,88,0.1)!important;
}

.webix_el_text input:focus, .webix_el_search input:focus,
.webix_el_combo input:focus, .webix_el_datepicker input, .webix_el_colorpicker input:focus {
    border-color: #767676!important;
}

.awbsegicon,
.awbappicon {
    top: 0 !important;
    font-size: 12px!important;
    color: #2a2a2a!important;
    background: transparent!important;
}

.awbbutton .webix_list_item .webix_submenu_icon {
    order: 3;
}

.webix_win_content .webix_scroll_cont {
    flex-direction: column;
    align-items: flex-start;
}

.webix_view.webix_window .webix_win_head > .webix_layout_toolbar .webix_scroll_cont {
    flex-direction: row;
    align-items: center;
    height: 32px;
}

.webix_toolbar .webix_el_icon .webix_el_box:hover {
    background: transparent!important;
}

.coinswix_filter_window .webix_icon_button:hover:before {
    background: transparent!important;
}

.coinswix_filter_window .coinswix_filter_title {
    height: auto!important;
}

.coinswix_filter_window .coinswix_filter_title .webix_el_box {
    color: #2a2a2a!important;
    height: auto!important;
}

.coinswix_filter_window .coinswix_filter_close {
    height: auto!important;
}

.coinswix_filter_window .coinswix_filter_close .webix_el_box {
    height: auto!important;
}

.webix_toolbar .webix_el_icon .webix_el_box:hover > .webix_icon_button {
    background: rgba(66,73,88,0.1);
}

.webix_win_head .webix_toolbar.toolbar .webix_scroll_cont {
    flex-direction: row;
}

.webix_win_content .webix_scroll_cont > .webix_list_item {
    width: 100%!important;
    background-color: #ffffff;
    color: #2a2a2a;
    transition: background .3s;
}

.webix_menu.webix_view .webix_list_item:hover,
.webix_menu.webix_view .webix_list_item:active {
    background-color: rgba(66,73,88,0.1)!important;
}

.awbbutton .webix_segment_0:hover,
.awbbutton .webix_segment_1:hover,
.awbbutton .webix_segment_N:hover,
.awbbutton .webix_segment_0.webix_selected,
.awbbutton .webix_segment_1.webix_selected,
.awbbutton .webix_segment_N.webix_selected {
    background-color: rgba(66,73,88,0.1)!important;
}

.awbbutton .webix_list_item:hover,
.awbbutton .webix_list_item:focus {
    background-color: rgba(66,73,88,0.1)!important;
}

.webix_secondary .webix_button:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

.webix_tooltip {
    background-color: #ffffff!important;
}

.webix_view.webix_list .webix_scroll_cont {
    flex-wrap: wrap;
}

.webix_list_diarytask_item,
.webix_list .webix_unit_header {
    width: 100%!important;
}

.webix_list_diarytask_item {
    box-shadow: none;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 3px;
    margin: 8px 4px 0 4px;
}

.webix_list_diarytask_item:hover {
    margin: 8px 4px 0 4px;
    border: 1px solid rgba(0,0,0,0.1);
}

.diary_addtaskbut {
    padding-top: 0;
}

.webix_list .webix_unit_header_diarytask_item {
    background-color: rgba(66,73,88,0.1);
    color: #2a2a2a;
}

.webix_list .webix_unit_header {
    border-color: rgba(0,0,0,0.1);
}

.webix_layout_toolbar.webix_toolbar.toolbar {
    background-color: #ffffff!important;
    margin-bottom: 8px;
}


.webix_layout_toolbar.webix_toolbar .webix_icon_button {
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 3px!important;
    width: 24px!important;
    height: 24px!important;
    justify-content: center;
    outline: none;
    transition: background .3s;
}

.webix_layout_toolbar.webix_toolbar .webix_icon_button:hover,
.webix_layout_toolbar.webix_toolbar .webix_el_icon .webix_icon_button.active,
.webix_layout_toolbar.webix_toolbar .webix_el_icon .webix_icon_button:focus {
    background-color: rgba(66,73,88,0.1)!important;
    border: 1px solid rgba(0,0,0,0.1)!important;
}

.webix_layout_toolbar.webix_toolbar .webix_icon_button .webix_icon {
    font-size: 14px!important;
    height: 14px!important;
    width: 14px!important;
    color: #2a2a2a!important;
}

.webix_layout_toolbar.webix_toolbar .webix_el_label {
    font-size: 14px!important;
}

.webix_el_colorpicker span.webix_input_icon, .webix_el_datepicker span.webix_input_icon, .webix_el_dbldatepicker span.webix_input_icon, .webix_el_search span.webix_input_icon {
    width: 18px!important;
    height: 18px!important;
    padding-top: 2px!important;
    padding-right: 2px;
    font-size: 14px;
}

.webix_layout_toolbar.webix_toolbar .webixtype_base {
    border-radius: 3px!important;
    background-color: #ffffff!important;
    height: 24px!important;
    width: 24px!important;
    border: 1px solid rgba(0,0,0,0.1)!important;
    color: #2a2a2a!important;
    transition: background .3s;
}

.webix_list_item {
    border-color: rgba(0,0,0,0.1)!important;
    transition: background .3s;
}

.webix_list_item:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

.webix_point_top {
    display: none!important;
}

.webix_layout_toolbar.webix_toolbar .webixtype_base:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

.webix_view.webix_window {
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1);
    border-radius: 4px!important;
}

.webix_view.webix_window .webix_win_head {
    border-bottom: 1px solid rgba(0,0,0,0.1)!important;
}

.webix_view.webix_window .webix_win_head > .webix_layout_toolbar {
    margin-bottom: 0!important;

}

.webix_layout_toolbar.webix_toolbar .webix_el_button, .webix_layout_toolbar.webix_toolbar .webix_el_label, .webix_layout_toolbar.webix_toolbar .webix_inp_label {
    color: #2a2a2a!important;
}

.webix_el_search .webix_inp_label, .webix_el_search .webix_inp_top_label, .webix_el_search .webix_label_right,
.webix_el_checkbox .webix_inp_label, .webix_el_checkbox .webix_inp_top_label, .webix_el_checkbox .webix_label_right,
.webix_el_combo .webix_inp_label, .webix_el_combo .webix_inp_top_label, .webix_el_combo .webix_label_right,
.webix_el_datepicker .webix_inp_label, .webix_el_datepicker .webix_inp_top_label, .webix_el_datepicker .webix_label_right,
.webix_el_colorpicker .webix_inp_label, .webix_el_colorpicker .webix_inp_top_label, .webix_el_colorpicker .webix_label_right {
    color: #767676;
}

.awb_divttip_label,
.awb_divttip_data {
    color: #767676!important;
}

.coinswix_filter_segment {
    margin-top: 10px!important;
    margin-bottom: 10px;
}

.coinswix_filter_segment .webix_segment_0, .coinswix_filter_segment .webix_segment_1, .coinswix_filter_segment .webix_segment_N {
    border: 1px solid rgba(0,0,0,0.1)!important;
}

.webix_all_segments .webix_segment_0, .webix_all_segments .webix_segment_1, .webix_all_segments .webix_segment_N {
    border-color: rgba(0,0,0,0.1)!important;
    color: #2a2a2a!important;
    background-color: #ffffff!important;
}

.webix_all_segments .webix_segment_1, .webix_all_segments .webix_segment_N {
    margin-left: 0!important;
}

.webix_segment_0 {
    border-radius: 3px 0 0 3px!important;
}

.webix_segment_N {
    border-radius: 0 3px 3px 0!important;
}

.webix_all_segments .webix_selected {
    background-color: rgba(66,73,88,0.1)!important;
    color: #2a2a2a!important;
}

.coinswix_filter_field .webix_inp_counter_prev, 
.coinswix_filter_field .webix_inp_counter_next {
    height: 26px!important;
    border-color: rgba(0,0,0,0.1)!important;
    outline: none;
}

.webix_inp_counter_next:hover, .webix_inp_counter_prev:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

.webix_ss_hscroll {
    bottom: 3px!important;
    position: absolute;
}

.webix_el_colorpicker span.webix_input_icon,
.webix_el_combo span.webix_input_icon, .webix_el_datepicker span.webix_input_icon,
.webix_el_dbldatepicker span.webix_input_icon, .webix_el_richselect span.webix_input_icon {
    background: transparent!important;
    color: #767676!important;
}

.webix_inp_static > .webix_input_icon .wxi-calendar {
    margin-top: 3px!important; 
    margin-right: 3px!important;
}

.webix_view.webix_layout_line .webix_img_btn {
    background-color: #ffffff!important;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.1);
    height: 24px;
    display: inline-flex;
    align-items: center;
    color: #2a2a2a!important;
    transition: background .3s;
}

.webix_view.webix_layout_line .webix_img_btn:hover {
    background-color: rgba(66,73,88,0.1)!important;
}

.webix_view.webix_layout_line .webix_img_btn .webix_icon_btn {
    color: #2a2a2a!important;
    background-color: transparent!important;
    transition: background .3s;
}

.webix_view.webix_layout_line > .webix_el_button:first-child {
    padding-right: 4px!important;
}

.webix_view.webix_layout_line > .webix_el_button:last-child {
    padding-left: 4px!important;
}

.webix_custom_checkbox {
    border: 1px solid rgba(0,0,0,0.1)!important;
    background-color: #ffffff!important;
    width: 16px!important;
    height: 16px!important;
    border-radius: 2px!important;
    cursor: pointer!important;
    transition: .3s;
    outline: none;
}

.mode-dark .webix_custom_checkbox {
    border-color: rgba(255,255,255,0.5)!important;
}

.webix_custom_checkbox:hover {
    border-color: #2a2a2a!important;
}

.webix_checkbox_1 .webix_custom_checkbox {
    border: 1px solid #2a2a2a!important;
    background-color: #4a4a4a!important;
}

.webix_checkbox_1 .webix_custom_checkbox:before {
    content: '\e9da'!important;
    color: #ffffff!important;
    font-family: "iCoins" !important;
    font-size: 24px!important;
    position: absolute;
    top: 0;
    left: -5px;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.coinswix_filter_field .webix_checkbox_1 .webix_custom_checkbox:before {
    top: -5px;
    left: -3px;
}

.coinswix_filter_field .wxi-calendar {
    right: 5px!important;
    top: 3px!important;
}

.webix_inp_static {
    height: 24px!important;
    color: #2a2a2a!important;
    background-color: #ffffff!important;
    font-size: 14px!important;
    border-radius: 2px!important;
    border: 1px solid rgba(0,0,0,0.1)!important;
    font-weight: 400!important;
    width: 100%!important;
}

.webix_el_colorpicker .webix_inp_static, .webix_el_colorpicker input,
.webix_el_datepicker .webix_inp_static, .webix_el_datepicker input,
.webix_el_dbldatepicker .webix_inp_static, .webix_el_dbldatepicker input,
.webix_el_richselect .webix_inp_static, .webix_el_richselect input {
    border-radius: 2px!important;
    transition: border .3s;
}

.webix_el_colorpicker .webix_inp_static:hover, .webix_el_colorpicker input:hover,
.webix_el_datepicker .webix_inp_static:hover, .webix_el_datepicker input:hover,
.webix_el_dbldatepicker .webix_inp_static:hover, .webix_el_dbldatepicker input:hover,
.webix_el_richselect .webix_inp_static:hover, .webix_el_richselect input:hover {
    border-color: rgba(66,73,88,0.1)!important;
}

.webix_el_colorpicker .webix_inp_static:focus, .webix_el_colorpicker input:focus,
.webix_el_datepicker .webix_inp_static:focus, .webix_el_datepicker input:focus,
.webix_el_dbldatepicker .webix_inp_static:focus, .webix_el_dbldatepicker input:focus,
.webix_el_richselect .webix_inp_static:focus, .webix_el_richselect input:focus {
    border-color: #767676!important;
}

.webix_cal_body .webix_cal_select, .webix_cal_body .webix_cal_select.webix_cal_today, .webix_cal_body .webix_selected {
    background: rgba(66,73,88,0.1)!important;
}

.webix_inp_counter_prev, .webixtype_base, .webix_icon_btn, .webix_img_btn, .webixtype_form, .webix_segment_N, .webix_segment_0, .webix_inp_counter_next, .webix_cal_select > span, .webix_popup_button > div, .webix_popup_title,
.webix_cal_day.webix_cal_select > span {
    background: transparent!important;
    color: #2a2a2a!important;
}

.webix_cal_body .webix_cal_today {
    border: none!important;
}

.webix_cal_day, .webix_cal_week_num {
    color: #2a2a2a!important;
}

.webix_cal_event,
.webix_cal_outside {
    color: #767676!important;
}

.webix_cal_outside {
    opacity: 0.6;
}

.webix_cal_month_name,
.webix_view>.webix_cal_header div,
.webix_cal_footer,
.webix_cal_block {
    color: #2a2a2a!important;
}

.webix_cal_icon:hover, .webix_cal_month_name:hover, .webix_cal_time:hover {
    color: #2a2a2a!important;
}

.webix_cal_footer .webix_cal_done, .webix_time_footer .webix_cal_done {
    background: #ffffff!important;
    border-color: rgba(0,0,0,0.1)!important;
    border-radius: 3px!important;
    transition: background .3s;
}

.webix_cal_footer .webix_cal_done:hover,
.webix_time_footer .webix_cal_done:hover {
    background: rgba(66,73,88,0.1)!important;
}

.webix_cal_body .webix_cal_select, .webix_cal_body .webix_cal_select.webix_cal_today, .webix_cal_body .webix_selected,
.webix_cal_body .webix_cal_event.webix_cal_select, .webix_cal_body .webix_selected {
    color: #2a2a2a!important;
}

.webix_view>.webix_cal_header div {
    border-color: rgba(0,0,0,0.1)!important;
}

.totalIcon > .webix_icon_button {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUAQMAAAC+rC80AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFKioqAAAAR67nYAAAAAJ0Uk5T/wDltzBKAAAALUlEQVR4nGNggAHGPwwN/xgO1DM8sGf4IM/wg5/hDxgBGUAuUBAoBVQAVAYDAODzD/V3o/90AAAAAElFTkSuQmCC') center 50% no-repeat!important;
    background-size: 10px!important;
}

.mode-dark .totalIcon > .webix_icon_button {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AMKDzU5BOUmFQAAAM1JREFUOMvV1CFOQ0EUheHzWgwJsq5I8EjYAzWso4GwAmAHJN0GGMIaisSDJJgiSVCED1PRDo/3JimGk1wxd2b+5J45mQaygQbZUH8COE/yVfRnSbaSNB11lSRBcIIP67rDznL/t7pcXRzhrYA8YtwFKRv7eC4gLzioBQQjPBSQdxzXAoJt3BaQT0xrAcEA135q7VxfDvpT2jHCTcsIp7UmzltMnNSYuIen4vJr7TMeYtESpN2aILVF+b4iyhfB2dKgVc0w7LsMzf//UL4BwiiIHdjoyJIAAAAASUVORK5CYII=') center 50% no-repeat!important;
    background-size: 10px!important;
}

.totalIcon.active > .webix_icon_button {
    background-color: rgba(66,73,88,0.1)!important;
}

.filterIcon.active > .webix_icon_button {
    background-color: rgba(66,73,88,0.1)!important;
}

.webix_ss_header,
.webix_ss_body {
    display: flex;
    flex-wrap: nowrap;
}

.dhx_cal_tab {
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-color: rgba(0,0,0,0.1);
    color: #767676;
    transition: background .3s;
}

.dhx_cal_tab_first {
    border-radius: 3px 0 0 3px;
    border-right: 0;
}

.dhx_cal_tab_last {
    border-radius: 0 3px 3px 0;
}

.dhx_cal_tab:not(.active):hover {
    background-color: rgba(66,73,88,0.1);
}

.dhx_cal_tab.active {
    text-shadow: none;
    background-color: rgba(66,73,88,0.1);
    border-color: rgba(0,0,0,0.1);
    color: #2a2a2a;
}

.dhx_cal_navline div.dhx_minical_icon {
    top: 15px;
    width: 24px;
    height: 24px;
    background-position: 0;
    background-size: contain;
    position: relative;
    background-image: none;
}

.dhx_cal_navline div.dhx_minical_icon:after {
    content: "\e913";
    font-family: "iCoins" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #767676;
    font-size: 24px;
}

.mode-dark .dhx_cal_navline div.dhx_minical_icon {
    filter: invert(1) brightness(3)!important;
}

.dhx_cal_today_button,
.dhx_cal_prev_button,
.dhx_cal_next_button {
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-color: rgba(0,0,0,0.1);
    color: #767676;
    position: relative;
    transition: background .3s;
}

.dhx_cal_next_button {
    border-radius: 0 3px 3px 0;
    background-image: none;
}

.dhx_cal_next_button:after {
    content: '\e9e2';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #767676;
    font-size: 24px;
    font-family: "iCoins" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
}

.dhx_cal_prev_button {
    border-radius: 3px 0 0 3px;
    background-image: none;
}

.dhx_cal_prev_button:after {
    content: '\e9e1';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #767676;
    font-size: 24px;
    font-family: "iCoins" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
}

.dhx_cal_today_button:hover,
.dhx_cal_prev_button:hover,
.dhx_cal_next_button:hover {
    background-color: rgba(66,73,88,0.1);
}

.dhx_cal_navline .dhx_cal_date,
.webix_toolbar .webix_el_label .webix_el_box {
    color: #2a2a2a;
}

/* calendar */
.dhx_scale_bar,
.dhx_scale_hour {
    background-color: #ffffff!important;
    color: #767676!important;
    border-color: rgba(0,0,0,0.1)!impotrant;
}

.dhx_scale_bar {
    border-left: 1px solid rgba(0,0,0,0.1)!important;
}

.dhx_month_head {
    border-right: 1px solid rgba(0,0,0,0.1)!important;
}

.dhx_cal_header {
    background-color: #ffffff;
    border-color: rgba(0,0,0,0.1)!important;
}

.dhx_scale_holder,
.dhx_cal_data {
    border-color: rgba(0,0,0,0.1)!important;
}

.dhx_scale_hour {
    position: relative;
    overflow: visible;
}

.dhx_scale_hour:after {
    content: '';
    height: 1px;
    width: 5000px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    position: absolute;
    left: 100%;
    bottom: -1px;
}

.dhx_scale_hour:before {
    content: '';
    height: 1px;
    width: 5000px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    position: absolute;
    left: 100%;
    bottom: calc(50% - 1px);
    opacity: 0.5;
}

.dhx_scale_holder {
    background-image: none;
    background-color: #ffffff;
}

.dhx_scale_holder_now {
    background-image: none;
    background-color: rgba(66,73,88,0.1);
    border-color: rgba(0,0,0,0.1);
}

.dhx_drag_marker {
    background-color: rgba(66,73,88,0.1);
    border-color: rgba(0,0,0,0.1);
    opacity: 1;
}

.dhx_cal_event {
    z-index: 1;
}

.dhtmlXTooltip.tooltip {
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
    color: #767676;
    box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
    border-radius: 3px;
}

.dhx_cal_container.dhx_mini_calendar {
    box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.1);
}

.dhx_month_head {
    background-color: #ffffff;
    color: #767676;
    border-radius: 0;
    transition: background .3s;
}

.dhx_month_head:hover {
    background-color: rgba(66,73,88,0.1);
}

.dhx_after .dhx_month_head,
.dhx_before .dhx_month_head,
.dhx_after .dhx_month_body,
.dhx_before .dhx_month_body {
    background-color: #ffffff;
    color: #767676!important;
    opacity: 0.8;
}

.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event.dhx_calendar_click,
.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_calendar_click {
    background-color: rgba(66,73,88,0.1);
}

.dhx_mini_calendar .dhx_year_event,
.dhx_mini_calendar .dhx_calendar_click {
    border-radius: 0;
}

.dhx_month_body {
    border-color: rgba(0,0,0,0.1)!important;
    background-color: #ffffff;
}

.dhx_mini_calendar .dhx_year_week {
    border-color: rgba(0,0,0,0.1);
}

.dhx_now .dhx_month_head,
.dhx_now .dhx_month_body {
    background-color: rgba(66,73,88,0.1);
}

.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event {
    background-color: rgba(66,73,88,0.1);
}

.dhxform_base .dhxform_control > .coins_required {
    display: inline-flex;
    align-items: center;
    min-width: 60px;
}

.dhxform_base_nested.in_block {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}


/* Checkboxes */

input[type='checkbox'] {
    border-color: rgba(0,0,0,0.1);
    background-color: #ffffff!important;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    margin: 2px 4px;
    vertical-align: middle;
    transition: border-color .3s;
}

td.formexpanddata > input[type='checkbox']:first-child {
    margin-left: 0;
}

.mode-dark input[type='checkbox'] {
    border-color: rgba(255,255,255,0.5);
}

input[type='checkbox']:checked {
    background-color: #4a4a4a!important;
    background-image: url(wousvg.p?style=v1105&icon=check_icon_dm.svg);
}

input[type='checkbox']:focus {
    border-color: rgba(0,0,0,0.1);
}

.mode-dark input[type='checkbox']:focus {
    border-color: rgba(255,255,255,0.5);
}

.mode-dark input[type='checkbox']:checked {
    border-color: rgba(255,255,255,1);
}

input[type='checkbox']:hover {
    border-color: #2a2a2a;
    background-color: #ffffff;
}

.mode-dark input[type='checkbox']:hover {
    border-color: #2a2a2a;
}

input[type='checkbox']:checked:hover {
    background-color: #4a4a4a;
}

INPUT[type='text'], INPUT[type='password'], TEXTAREA, SELECT, .ui-multiselect {
    background-color: #ffffff;
    border-color: rgba(0,0,0,0.1);
    background-image: none;
}

INPUT:not([type='checkbox']):focus, TEXTAREA:focus, SELECT:focus, DIV.styled-select:focus select, .ui-multiselect:focus {
    background-color: #ffffff;
}

select[multiple] > option:hover {
    background-color: rgba(66,73,88,0.1);
    color: #2a2a2a;
}

select[multiple] > option:focus {
    background-color: rgba(66,73,88,0.1);
    color: #2a2a2a;
    user-select: none;
    outline: none;
}

select[multiple] > option:checked {
    background-color: #4a4a4a;
    color: #FFFFFF;
    user-select: none;
    outline: none;
}

.mode-dark select[multiple] > option:checked {
    color: #2a2a2a;
}

.ui-multiselect.ui-state-default, .ui-multiselect.ui-state-active {
    background-color: #ffffff;
    color: #2a2a2a;
}

.ui-multiselect.ui-state-default:hover {
    background-color: #ffffff;
    border-color: rgba(66,73,88,0.1);
}

.ui-multiselect.ui-state-default:focus {
    background-color: #ffffff;
    border-color: #4a4a4a;
}

.mode-dark .ui-multiselect .ui-icon-triangle-1-s {
    filter: invert(1);
}

.ui-multiselect-header {
    background-color: #ffffff;
    color: #2a2a2a;
}

.ui-multiselect-header .ui-multiselect-filter input {
    background-color: #ffffff;
    color: #2a2a2a;
    border: 1px solid rgba(0,0,0,0.1)!important;
    border-radius: 3px;
    outline: none;
}

.ui-multiselect-header .ui-multiselect-filter input:placeholder {
    color: #767676;
}

.ui-multiselect-header .ui-multiselect-filter input:hover {
    border-color: rgba(66,73,88,0.1)!important;
}

.ui-multiselect-header .ui-multiselect-filter input:focus {
    border-color: #4a4a4a!important;
}

.ui-widget-header a {
    color: #767676;
}

.ui-multiselect-filter {
    margin-bottom: 6px;
}

ul.ui-multiselect-checkboxes li label.ui-state-hover {
    background-color: rgba(66,73,88,0.1);
    border-color: transparent;
}

.ui-multiselect-checkboxes label {
    padding: 4px 6px 4px 6px!important;
    text-indent: 0!important;
    display: flex!important;
    align-items: center;
}

.ui-multiselect-checkboxes input {
    min-width: 16px;
    top: 0;
}


/* Calendar Control  */
/* All important styles added only for S&D page calendar (google map) */
#CalendarControl {
    background-color: #ffffff!important;
    box-shadow: none!important;
    border: 1px solid rgba(0,0,0,0.1)!important;
    box-shadow: 0px 1px 20px rgba(0,0,0,0.1)!important;
    border-radius: 4px!important;
    overflow: hidden!important;
}

#CalendarControl a {
    outline: none!important;
}

#CalendarControl .header {
    background-color: rgba(66,73,88,0.1)!important;
    color: #2a2a2a!important;
}

#CalendarControl th {
    background-color: #ffffff!important;
    color: #2a2a2a!important;
    border-color: rgba(0,0,0,0.1)!important;
}

#CalendarControl td {
    border-color: rgba(0,0,0,0.1)!important;
}

#CalendarControl .empty {
    background-color: #ffffff!important;
}

#CalendarControl .weekday {
    background-color: #ffffff!important;
    color: #2a2a2a!important;
}

#CalendarControl .weekday, #CalendarControl .weekend, #CalendarControl .current {
    border-color: #ffffff!important;
    border-top-width: 1px!important;
    border-bottom-width: 1px!important;
    border-left-width: 4px!important;
    border-right-width: 4px!important;
}

#CalendarControl .weekend {
    background-color: #ffffff!important;
    color: #767676!important;
}

#CalendarControl .weekday:hover {
    background-color: rgba(66,73,88,0.1)!important;
    border-radius: 3px!important;
}

#CalendarControl .weekend:hover {
    background-color: rgba(66,73,88,0.1)!important;
    border-radius: 3px!important;
    border-color: transparent!important;
}

#CalendarControl .current {
    background-color: #4a4a4a!important;
    color: #ffffff!important;
    border-radius: 3px!important;
}

.mode-dark #CalendarControl .current {
    color: #2a2a2a!important;
}

#CalendarControl tr.header td.next a,
#CalendarControl tr.header td.previous a {
    position: relative!important;
    color: rgba(66,73,88,0.1)!important;
}

#CalendarControl tr.header td.next a:after,
#CalendarControl tr.header td.previous a:after {
    content: '\e9e2'!important;
    position: absolute!important;
    top: 50%!important;
    left: 50%!important;
    transform: translate(-50%, -50%)!important;
    color: #2a2a2a!important;
    font-size: 24px!important;
    font-family: "iCoins" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#CalendarControl tr.header td.previous a:first-of-type:after {
    content: '\e9e1'!important;
}

#CalendarControl tr.header td.next a:first-of-type:after,
#CalendarControl tr.header td.previous a:last-of-type:after {
    content: '\e9f5'!important;
    transform: translate(-50%, -40%) rotate(90deg)!important;
}

#CalendarControl tr.header td.next a:first-of-type:after {
    transform: translate(-50%, -40%) rotate(-90deg)!important;
}




/* Sectionbar */
div.sectionbarheader {
    background-color: #ffffff;
    color: #2a2a2a;
    border-color: transparent;
}

div.sectionbar.open div.sectionbarheader,
div.sectionbar.open div.sectionbarinner {
    background-color: rgba(66,73,88,0.1);
}

div.sectionbarheader:hover {
    background-color: rgba(66,73,88,0.1);
}

div.sectionbarinner {
    background-color: #ffffff;
}

div.sectionbarheader h2 {
    color: #2a2a2a!important;
    font-weight: 400;
}

.mode-dark div.sectionbarbtn {
    filter: invert(1);
}


/* advanced filter  */
.ui-widget-header,
.ui-widget-content {
    border-color: rgba(0,0,0,0.1);
}

TD.filter, table#advancedFilter,
table#advancedFilter th {
    background-color: #ffffff;
}

.mode-dark .ui-dialog-buttonset > button > img {
    filter: invert(1);
}

/* Frozen columns */
div.freezetd, div.freezeth {
    max-height: 2.2em;
    overflow: hidden;
}


/* Codemirror  */
div.CodeMirror {
    border-color: rgba(0,0,0,0.1);
}

.CodeMirror-scroll {
    background-color: #ffffff;
    border-color: rgba(0,0,0,0.1);
}

.CodeMirror-activeline-background {
    background-color: rgba(66,73,88,0.1)!important;
}

.CodeMirror-gutters {
    background-color: #4a4a4a;
    border-color: rgba(0,0,0,0.1);
}

.cm-s-default .cm-variable {
    color: #2a2a2a;
}

div.codemirror-jsro div.CodeMirror-scroll div, div.codemirror-progressro div.CodeMirror-scroll div, div.codemirror-coinscalcro div.CodeMirror-scroll div, div.codemirror-htmlro div.CodeMirror-scroll div, div.codemirror-xmlro div.CodeMirror-scroll div, div.codemirror-cssro div.CodeMirror-scroll div {
    background-color: transparent;
}

.CodeMirror-gutter.CodeMirror-linenumbers {
    background-color: #4a4a4a!important;
    border-color: rgba(0,0,0,0.1);
}

div.codemirror-jsro .CodeMirror-activeline-background, div.codemirror-progressro .CodeMirror-activeline-background, div.codemirror-coinscalcro .CodeMirror-activeline-background, div.codemirror-htmlro .CodeMirror-activeline-background, div.codemirror-xmlro .CodeMirror-activeline-background, div.codemirror-cssro .CodeMirror-activeline-background {
    background-color: rgba(66,73,88,0.1)!important;
}


/* Splitform */
#splitForm_center,
#splitForm_south {
    background: #ffffff!important;
}

td.formblock,
TD.formbg TABLE {
    background: #ffffff!important;
}

td.formgrouplaycompact td.layouttitle,
td.formexpandgrouplaycompact td.layouttitle,
td.layoutbody td.formgrouplaycompact td.layouttitle,
td.layoutbody td.formexpandgrouplaycompact td.layouttitle,
td.formgrouplaycompactnb td.layouttitle,
td.formexpandgrouplaycompactnb td.layouttitle,
td.layoutbody td.formgrouplaycompactnb td.layouttitle,
td.layoutbody td.formexpandgrouplaycompactnb td.layouttitle {
    color: #2a2a2a;
    display: flex;
    align-items: center;
}

td.layouttitle > .buttonanchor {
    margin-left: 4px;
}

TD.formlabel,
TD.formdata {
    background: #ffffff;
}

td[class^='formgrouplay'].nobg, td[class^='formgrouplay'].nobg > table {
    background-color: #ffffff;
}

td.cvrrow, td.formdatacvrrow, td.formexpanddatacvrrow,
td.cvrlabel, td.formdatacvrlabel, td.formexpanddatacvrlabel {
    border-color: rgba(0,0,0,0.1);
}

td.cvrhead, th.cvrhead, td.formdatacvrhead, td.formexpanddatacvrhead {
    background-color: rgba(66,73,88,0.1);
    color: #2a2a2a;
    border-color: rgba(0,0,0,0.1);
}

*.heatmap1,td.heatmap1 { background-color: #F8696B!important; }
*.heatmap2,td.heatmap2 { background-color: #F98570!important; }
*.heatmap3,td.heatmap3 { background-color: #FBA276!important; }
*.heatmap4,td.heatmap4 { background-color: #FCBF7B!important; }
*.heatmap5,td.heatmap5 { background-color: #FEDC81!important; }
*.heatmap6,td.heatmap6 { background-color: #EEE683!important; }
*.heatmap7,td.heatmap7 { background-color: #CCDD82!important; }
*.heatmap8,td.heatmap8 { background-color: #A9D27F!important; }
*.heatmap9,td.heatmap9 { background-color: #86C97E!important; }
*.heatmap10,td.heatmap10 { background-color: #63BE7B!important; }

a.tdwindow {
    border-bottom: none!important;
    color: #2a2a2a!important;
    text-decoration: underline;
}

/* Help pane  */
H1 {
    color: #767676;
}

a.more, a.more:visited, a.parameters, a.parameters:visited {
    color: #2a2a2a;
    text-decoration: underline;
}

SPAN.procedure, a.function, SPAN.function {
    color: #2a2a2a;
    text-decoration: underline;
}

TABLE.fields {
    border-spacing: 0;
}

TABLE.fields TD {
    background-color: #ffffff;
}

td.screen, td.screentype {
    color: #2a2a2a;
}

.mode-dark a.more > img, .mode-dark a.parameters > img {
    filter: invert(1);
}

div.actionlist, div.elementlist, div.rowlist, div.matrixlist {
    border-color: rgba(0,0,0,0.1);
    box-sizing: border-box;
}

TABLE.fields tr > td {
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

TABLE.fields tr > td:first-child {
    padding-right: 0;
}

TABLE.fields tr > td:last-child {
    padding-left: 0;
}

div.recheadhelp, div.contexthelp, div.headerhelp {
    border-color: rgba(0,0,0,0.1);
    box-sizing: border-box;
}

div.usertext {
    background-color: #ffffff;
    border-color: rgba(0,0,0,0.1);
    box-sizing: border-box;
}

h2.tabhelp {
    background-color: #ffffff;
}

a.glossterm, a.glossterm:visited, a.glossterm:hover {
    color: #2a2a2a;
    border: none;
    text-decoration: underline;
}

.field,
.parameter, p.paramlist {
    color: #2a2a2a;
}

div.parameters, div.configuration {
    background-color: #ffffff;
}

.userselect {
    color: #767676;
}


/* COINS INFO CTRL+SHIFT+C */
div.coinsinfo {
    background-color: #ffffff;
    border: solid 3px rgba(0,0,0,0.1);
}

H2.coinsinfo a {
    color: #2a2a2a;
}

H2.coinsinfo a:hover {
    color: #2a2a2a;
}

TABLE.coinsinfo TD {
    BORDER-BOTTOM: solid rgba(0,0,0,0.1) 1pt;
    word-break: break-all;
}

TABLE.coinsinfo TH {
    background-color: rgba(66,73,88,0.1);
}
