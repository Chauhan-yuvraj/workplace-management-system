
# Folder Structure

## Summary
- **Total Folders**: 102
- **Total Files**: 349
- **Root Directory**: workplace-management-system

### File Types
- **.tsx**: 116
- **.mjs**: 1
- **.json**: 27
- **.js**: 49
- **.ts**: 115
- **.md**: 6
- **.svg**: 3
- **.css**: 3
- **.png**: 13
- **.html**: 2
- **other**: 7
- **.jpg**: 3
- **.2025-12-19**: 1
- **.cookie**: 1
- **.yaml**: 2

## Table of Contents
- [Directory Structure](#directory-structure)

## Directory Structure

```
workplace-management-system/
├─ 📁 packages
│  ├─ 📁 ui
│  │  ├─ 📁 src
│  │  │  ├─ 📄 button.tsx (0.4 KB)
│  │  │  ├─ 📄 card.tsx (0.5 KB)
│  │  │  └─ 📄 code.tsx (0.2 KB)
│  │  ├─ 📄 eslint.config.mjs (0.1 KB)
│  │  ├─ 📊 package.json (0.6 KB)
│  │  └─ 📊 tsconfig.json (0.2 KB)
│  ├─ 📁 typescript-config
│  │  ├─ 📊 base.json (0.5 KB)
│  │  ├─ 📊 nextjs.json (0.3 KB)
│  │  ├─ 📊 package.json (0.1 KB)
│  │  └─ 📊 react-library.json (0.1 KB)
│  ├─ 📁 types
│  │  ├─ 📁 src
│  │  │  ├─ 💻 feedback.js (0.1 KB)
│  │  │  ├─ 💻 feedback.ts (1.0 KB)
│  │  │  ├─ 💻 index.js (0.9 KB)
│  │  │  ├─ 💻 index.ts (0.1 KB)
│  │  │  ├─ 💻 user.js (0.3 KB)
│  │  │  ├─ 💻 user.ts (0.8 KB)
│  │  │  ├─ 💻 visit.js (0.1 KB)
│  │  │  └─ 💻 visit.ts (1.2 KB)
│  │  ├─ 📁 dist
│  │  │  ├─ 💻 feedback.d.ts (0.8 KB)
│  │  │  ├─ 💻 feedback.js (0.1 KB)
│  │  │  ├─ 💻 index.d.ts (0.1 KB)
│  │  │  ├─ 💻 index.js (0.9 KB)
│  │  │  ├─ 💻 user.d.ts (0.8 KB)
│  │  │  ├─ 💻 user.js (0.3 KB)
│  │  │  ├─ 💻 visit.d.ts (1.1 KB)
│  │  │  └─ 💻 visit.js (0.1 KB)
│  │  ├─ 📊 package.json (0.2 KB)
│  │  └─ 📊 tsconfig.json (0.2 KB)
│  └─ 📁 eslint-config
│     ├─ 💻 base.js (0.6 KB)
│     ├─ 💻 next.js (1.5 KB)
│     ├─ 📊 package.json (0.6 KB)
│     ├─ 💻 react-internal.js (1.1 KB)
│     └─ 📜 README.md (0.1 KB)
├─ 📁 apps
│  ├─ 📁 Web
│  │  ├─ 📁 src
│  │  │  ├─ 📁 types
│  │  │  │  ├─ 💻 delivery.ts (0.7 KB)
│  │  │  │  ├─ 💻 record.ts (0.6 KB)
│  │  │  │  ├─ 💻 user.ts (0.1 KB)
│  │  │  │  ├─ 💻 visit.ts (0.1 KB)
│  │  │  │  └─ 💻 visitor.ts (0.3 KB)
│  │  │  ├─ 📁 store
│  │  │  │  ├─ 📁 slices
│  │  │  │  │  ├─ 💻 authSlice.ts (2.4 KB)
│  │  │  │  │  ├─ 💻 deliverySlice.ts (2.2 KB)
│  │  │  │  │  ├─ 💻 employeeSlice.ts (4.4 KB)
│  │  │  │  │  ├─ 💻 recordSlice.ts (2.4 KB)
│  │  │  │  │  ├─ 💻 visitorSlice.ts (4.3 KB)
│  │  │  │  │  └─ 💻 visitSlice.ts (4.3 KB)
│  │  │  │  ├─ 💻 hooks.ts (0.4 KB)
│  │  │  │  └─ 💻 store.ts (0.7 KB)
│  │  │  ├─ 📁 services
│  │  │  │  ├─ 💻 api.ts (2.6 KB)
│  │  │  │  ├─ 💻 auth.service.ts (0.7 KB)
│  │  │  │  ├─ 💻 delivery.service.ts (0.8 KB)
│  │  │  │  ├─ 💻 employees.service.ts (1.7 KB)
│  │  │  │  ├─ 💻 records.service.ts (0.7 KB)
│  │  │  │  ├─ 💻 visitors.service.ts (1.6 KB)
│  │  │  │  └─ 💻 visits.service.ts (1.6 KB)
│  │  │  ├─ 📁 pages
│  │  │  │  ├─ 📁 Dashbaord
│  │  │  │  │  ├─ 📁 Visits
│  │  │  │  │  │  └─ 📄 Visits.tsx (2.1 KB)
│  │  │  │  │  ├─ 📁 Visitors
│  │  │  │  │  │  └─ 📄 Visitors.tsx (2.2 KB)
│  │  │  │  │  ├─ 📁 Records
│  │  │  │  │  │  └─ 📄 Records.tsx (1.7 KB)
│  │  │  │  │  ├─ 📁 Employees
│  │  │  │  │  │  └─ 📄 Employees.tsx (2.2 KB)
│  │  │  │  │  ├─ 📁 Deliveries
│  │  │  │  │  │  └─ 📄 Deliveries.tsx (1.3 KB)
│  │  │  │  │  └─ 📄 Dashboard.tsx (10.2 KB)
│  │  │  │  ├─ 📄 HomeScreen.tsx (1.8 KB)
│  │  │  │  └─ 📄 Login.tsx (0.8 KB)
│  │  │  ├─ 📁 lib
│  │  │  │  └─ 💻 utils.ts (0.2 KB)
│  │  │  ├─ 📁 hooks
│  │  │  │  ├─ 💻 useDeliveries.ts (1.5 KB)
│  │  │  │  ├─ 💻 useEmployees.ts (2.2 KB)
│  │  │  │  ├─ 💻 useLogin.ts (0.9 KB)
│  │  │  │  ├─ 💻 useRecords.ts (1.7 KB)
│  │  │  │  ├─ 💻 useVisitors.ts (2.1 KB)
│  │  │  │  └─ 💻 useVisits.ts (2.0 KB)
│  │  │  ├─ 📁 data
│  │  │  │  └─ 📁 dashboard
│  │  │  ├─ 📁 constants
│  │  │  │  └─ 📁 dashboard
│  │  │  │     └─ 💻 navigation.ts (0.7 KB)
│  │  │  ├─ 📁 components
│  │  │  │  ├─ 📁 Visitor
│  │  │  │  │  ├─ 📄 VisitorGrid.tsx (2.4 KB)
│  │  │  │  │  ├─ 📄 VisitorList.tsx (3.6 KB)
│  │  │  │  │  ├─ 📄 VisitorModal.tsx (8.3 KB)
│  │  │  │  │  └─ 📄 VisitorProfileModal.tsx (4.9 KB)
│  │  │  │  ├─ 📁 Visit
│  │  │  │  │  ├─ 📄 VisitGrid.tsx (2.7 KB)
│  │  │  │  │  ├─ 📄 VisitList.tsx (3.7 KB)
│  │  │  │  │  ├─ 📄 VisitModal.tsx (8.2 KB)
│  │  │  │  │  ├─ 📄 VisitProfileModal.tsx (6.1 KB)
│  │  │  │  │  └─ 📄 VisitStatusBadge.tsx (0.9 KB)
│  │  │  │  ├─ 📁 ui
│  │  │  │  │  ├─ 📄 Background.tsx (1.2 KB)
│  │  │  │  │  ├─ 📄 Button.tsx (2.2 KB)
│  │  │  │  │  ├─ 📄 Input.tsx (0.8 KB)
│  │  │  │  │  ├─ 📄 Label.tsx (0.4 KB)
│  │  │  │  │  ├─ 📄 Modal.tsx (1.6 KB)
│  │  │  │  │  ├─ 📄 PageControls.tsx (2.0 KB)
│  │  │  │  │  ├─ 📄 PageHeader.tsx (0.8 KB)
│  │  │  │  │  ├─ 📄 select.tsx (6.2 KB)
│  │  │  │  │  └─ 📄 WhitePattern.tsx (2.6 KB)
│  │  │  │  ├─ 📁 Record
│  │  │  │  │  ├─ 📄 RecordDetailModal.tsx (5.1 KB)
│  │  │  │  │  ├─ 📄 RecordGrid.tsx (2.0 KB)
│  │  │  │  │  └─ 📄 RecordList.tsx (2.8 KB)
│  │  │  │  ├─ 📁 layout
│  │  │  │  │  ├─ 📄 DashboardLayout.tsx (0.4 KB)
│  │  │  │  │  └─ 📄 Sidebar.tsx (1.7 KB)
│  │  │  │  ├─ 📁 Employee
│  │  │  │  │  ├─ 📄 EmployeeGrid.tsx (1.8 KB)
│  │  │  │  │  ├─ 📄 EmployeeList.tsx (3.2 KB)
│  │  │  │  │  ├─ 📄 EmployeeModal.tsx (9.5 KB)
│  │  │  │  │  └─ 📄 EmployeeProfileModal.tsx (4.6 KB)
│  │  │  │  ├─ 📁 Delivery
│  │  │  │  │  ├─ 📄 DeliveryGrid.tsx (2.9 KB)
│  │  │  │  │  └─ 📄 DeliveryModal.tsx (4.1 KB)
│  │  │  │  └─ 📁 auth
│  │  │  │     └─ 📄 LoginForm.tsx (2.4 KB)
│  │  │  ├─ 📁 assets
│  │  │  │  └─ 📄 react.svg (4.0 KB)
│  │  │  ├─ 📄 App.tsx (0.1 KB)
│  │  │  ├─ 📄 index.css (4.1 KB)
│  │  │  ├─ 📄 main.tsx (0.6 KB)
│  │  │  └─ 📄 router.tsx (1.6 KB)
│  │  ├─ 📁 public
│  │  │  ├─ 🖼️ icon.png (121.3 KB)
│  │  │  └─ 📄 vite.svg (1.5 KB)
│  │  ├─ 📁 dist
│  │  │  ├─ 📁 assets
│  │  │  │  ├─ 💻 index-BaupBBJC.js (762.3 KB)
│  │  │  │  └─ 📄 index-BGmcNGXD.css (38.1 KB)
│  │  │  ├─ 🖼️ icon.png (121.3 KB)
│  │  │  ├─ 📄 index.html (0.4 KB)
│  │  │  └─ 📄 vite.svg (1.5 KB)
│  │  ├─ 📄 .gitignore (0.2 KB)
│  │  ├─ 📊 components.json (0.4 KB)
│  │  ├─ 💻 eslint.config.js (0.6 KB)
│  │  ├─ 📄 index.html (0.4 KB)
│  │  ├─ 📊 package-lock.json (181.7 KB)
│  │  ├─ 📊 package.json (1.2 KB)
│  │  ├─ 📜 README.md (2.5 KB)
│  │  ├─ 📊 tsconfig.app.json (0.8 KB)
│  │  ├─ 📊 tsconfig.json (0.2 KB)
│  │  ├─ 📊 tsconfig.node.json (0.6 KB)
│  │  └─ 💻 vite.config.ts (0.3 KB)
│  ├─ 📁 Mobile
│  │  ├─ 📁 utils
│  │  │  ├─ 📁 employees
│  │  │  │  └─ 💻 employee.utils.ts (0.4 KB)
│  │  │  ├─ 💻 Result.utils.ts (1.5 KB)
│  │  │  ├─ 💻 serializationUtils.ts (1.9 KB)
│  │  │  ├─ 💻 visit.utils.ts (1.7 KB)
│  │  │  └─ 💻 visitor.utils.ts (0.4 KB)
│  │  ├─ 📁 store
│  │  │  ├─ 📁 types
│  │  │  │  ├─ 💻 common.ts (0.1 KB)
│  │  │  │  ├─ 💻 delivery.ts (0.5 KB)
│  │  │  │  ├─ 💻 feedback.ts (0.1 KB)
│  │  │  │  ├─ 💻 user.ts (0.1 KB)
│  │  │  │  ├─ 💻 visit.ts (0.1 KB)
│  │  │  │  └─ 💻 visitor.ts (0.3 KB)
│  │  │  ├─ 📁 slices
│  │  │  │  ├─ 💻 auth.slice.ts (5.9 KB)
│  │  │  │  ├─ 💻 canvas.slice.ts (1.2 KB)
│  │  │  │  ├─ 💻 delivery.slice.ts (2.6 KB)
│  │  │  │  ├─ 💻 employees.slice.ts (5.4 KB)
│  │  │  │  ├─ 💻 guest.slice.ts (4.4 KB)
│  │  │  │  ├─ 💻 records.slice.ts (4.6 KB)
│  │  │  │  └─ 💻 visit.slice.ts (3.8 KB)
│  │  │  ├─ 💻 hooks.ts (0.3 KB)
│  │  │  └─ 💻 store.ts (0.9 KB)
│  │  ├─ 📁 services
│  │  │  ├─ 💻 api.ts (6.3 KB)
│  │  │  ├─ 💻 auth.service.ts (0.4 KB)
│  │  │  ├─ 💻 delivery.service.ts (0.6 KB)
│  │  │  ├─ 💻 employees.service.ts (2.6 KB)
│  │  │  ├─ 💻 feedback.service.ts (2.1 KB)
│  │  │  ├─ 💻 guest.service.ts (4.5 KB)
│  │  │  ├─ 💻 records.service.ts (0.9 KB)
│  │  │  └─ 💻 visits.service.ts (2.2 KB)
│  │  ├─ 📁 scripts
│  │  │  └─ 💻 reset-project.js (3.5 KB)
│  │  ├─ 📁 hooks
│  │  │  ├─ 📁 Dashboard
│  │  │  │  ├─ 📁 visits
│  │  │  │  │  ├─ 💻 useVisitActions.ts (2.1 KB)
│  │  │  │  │  └─ 💻 useVisits.ts (2.2 KB)
│  │  │  │  ├─ 📁 visitors
│  │  │  │  │  ├─ 💻 useVisitorActions.ts (2.0 KB)
│  │  │  │  │  └─ 💻 useVisitors.ts (1.6 KB)
│  │  │  │  ├─ 📁 employees
│  │  │  │  │  ├─ 💻 useEmployeeActions.ts (2.4 KB)
│  │  │  │  │  ├─ 💻 useEmployeeForm.ts (3.0 KB)
│  │  │  │  │  └─ 💻 useEmployees.ts (1.4 KB)
│  │  │  │  └─ 💻 useDashboardTabs.ts (0.4 KB)
│  │  │  ├─ 💻 use-color-scheme.ts (0.0 KB)
│  │  │  ├─ 💻 use-color-scheme.web.ts (0.5 KB)
│  │  │  ├─ 💻 use-theme-color.ts (0.5 KB)
│  │  │  ├─ 💻 useAudioRecorder.ts (2.4 KB)
│  │  │  ├─ 💻 useFeedbackSubmit.ts (2.4 KB)
│  │  │  ├─ 💻 useImagePicker.ts (1.9 KB)
│  │  │  └─ 💻 useRefresh.ts (0.7 KB)
│  │  ├─ 📁 data
│  │  │  └─ 💻 Canvas.ts (0.2 KB)
│  │  ├─ 📁 constants
│  │  │  ├─ 💻 constant.ts (0.3 KB)
│  │  │  └─ 💻 theme.ts (1.6 KB)
│  │  ├─ 📁 components
│  │  │  ├─ 📁 ui
│  │  │  │  ├─ 📄 background.tsx (0.6 KB)
│  │  │  │  ├─ 📄 button.tsx (1.4 KB)
│  │  │  │  ├─ 📄 collapsible.tsx (1.3 KB)
│  │  │  │  ├─ 📄 DrawingCanavs.tsx (8.8 KB)
│  │  │  │  ├─ 📄 FormInput.tsx (1.1 KB)
│  │  │  │  ├─ 📄 icon-symbol.ios.tsx (0.6 KB)
│  │  │  │  ├─ 📄 icon-symbol.tsx (1.4 KB)
│  │  │  │  ├─ 📄 Input.ui.tsx (1.2 KB)
│  │  │  │  └─ 📄 SelectionList.tsx (2.4 KB)
│  │  │  ├─ 📁 dashboard
│  │  │  │  ├─ 📁 Visits
│  │  │  │  │  ├─ 📄 VisitCard.tsx (4.3 KB)
│  │  │  │  │  ├─ 📄 VisitForm.tsx (17.7 KB)
│  │  │  │  │  └─ 📄 VisitsList.tsx (6.7 KB)
│  │  │  │  ├─ 📁 Visitors
│  │  │  │  │  ├─ 📄 VisitorCard.tsx (3.2 KB)
│  │  │  │  │  ├─ 📄 VisitorForm.tsx (9.2 KB)
│  │  │  │  │  └─ 📄 VisitorsList.tsx (5.7 KB)
│  │  │  │  ├─ 📁 sidebar
│  │  │  │  │  └─ 📄 Sidebar.tsx (3.6 KB)
│  │  │  │  ├─ 📁 Records
│  │  │  │  │  ├─ 📄 RecordCard.tsx (1.9 KB)
│  │  │  │  │  └─ 📄 RecordsList.tsx (4.2 KB)
│  │  │  │  ├─ 📁 Employees
│  │  │  │  │  ├─ 📄 EmployeeCard.tsx (2.7 KB)
│  │  │  │  │  ├─ 📄 EmployeeForm.tsx (6.3 KB)
│  │  │  │  │  ├─ 📄 EmployeeFormHeader.tsx (1.0 KB)
│  │  │  │  │  ├─ 📄 EmployeesList.tsx (6.0 KB)
│  │  │  │  │  └─ 📄 ImageUpload.tsx (1.2 KB)
│  │  │  │  ├─ 📁 Deliveries
│  │  │  │  │  ├─ 📄 DeliveriesList.tsx (7.4 KB)
│  │  │  │  │  ├─ 📄 DeliveryCard.tsx (5.0 KB)
│  │  │  │  │  └─ 📄 DeliveryForm.tsx (8.3 KB)
│  │  │  │  ├─ 📄 DashboardContent.tsx (1.1 KB)
│  │  │  │  ├─ 📄 DashboardHeader.tsx (0.8 KB)
│  │  │  │  ├─ 📄 DateFilter.tsx (3.3 KB)
│  │  │  │  └─ 📄 MainDashBoard.tsx (8.3 KB)
│  │  │  ├─ 📁 canvas
│  │  │  │  ├─ 📄 AudioRecorderView.tsx (2.7 KB)
│  │  │  │  ├─ 📄 FeedbackToggle.tsx (1.2 KB)
│  │  │  │  └─ 📄 ImageAttachment.tsx (3.3 KB)
│  │  │  ├─ 📁 auth
│  │  │  │  └─ 📄 LoginForm.tsx (3.4 KB)
│  │  │  ├─ 📄 Background.tsx (2.7 KB)
│  │  │  ├─ 📄 Buttons.tsx (0.5 KB)
│  │  │  ├─ 📄 Card.tsx (3.9 KB)
│  │  │  ├─ 📄 colorPalette.tsx (1.4 KB)
│  │  │  ├─ 📄 CreateGuestButton.tsx (0.9 KB)
│  │  │  ├─ 📄 DisplayCanvas.tsx (2.2 KB)
│  │  │  ├─ 📄 external-link.tsx (0.8 KB)
│  │  │  ├─ 📄 guestCard.tsx (1.1 KB)
│  │  │  ├─ 📄 haptic-tab.tsx (0.6 KB)
│  │  │  ├─ 📄 hello-wave.tsx (0.4 KB)
│  │  │  ├─ 📄 parallax-scroll-view.tsx (1.9 KB)
│  │  │  ├─ 📄 ParallaxRow.tsx (3.4 KB)
│  │  │  ├─ 📄 RecordDetailModal.tsx (7.6 KB)
│  │  │  ├─ 📄 SelectGuestCard.tsx (1.5 KB)
│  │  │  ├─ 📄 SelectMode.tsx (1.7 KB)
│  │  │  ├─ 📄 SelectTool.tsx (2.7 KB)
│  │  │  ├─ 📄 SignatureCanvas.tsx (4.6 KB)
│  │  │  ├─ 📄 TableHeader.tsx (1.3 KB)
│  │  │  ├─ 📄 themed-text.tsx (1.3 KB)
│  │  │  └─ 📄 themed-view.tsx (0.5 KB)
│  │  ├─ 📁 assets
│  │  │  ├─ 📁 images
│  │  │  │  ├─ 🖼️ android-icon-background.png (275.7 KB)
│  │  │  │  ├─ 🖼️ android-icon-foreground.png (275.7 KB)
│  │  │  │  ├─ 🖼️ android-icon-monochrome.png (275.7 KB)
│  │  │  │  ├─ 🖼️ background.jpg (142.3 KB)
│  │  │  │  ├─ 🖼️ bg.jpg (190.0 KB)
│  │  │  │  ├─ 🖼️ bg2.jpg (425.2 KB)
│  │  │  │  ├─ 🖼️ favicon.png (121.3 KB)
│  │  │  │  ├─ 🖼️ icon.png (121.3 KB)
│  │  │  │  ├─ 🖼️ partial-react-logo.png (5.0 KB)
│  │  │  │  ├─ 🖼️ react-logo.png (6.2 KB)
│  │  │  │  ├─ 🖼️ react-logo@2x.png (13.9 KB)
│  │  │  │  ├─ 🖼️ react-logo@3x.png (20.8 KB)
│  │  │  │  └─ 🖼️ splash-icon.png (17.1 KB)
│  │  │  └─ 📁 background-pattern
│  │  │     ├─ 📄 Whitebg.tsx (1.9 KB)
│  │  │     └─ 🖼️ Whitegrid.png (8.4 KB)
│  │  ├─ 📁 app
│  │  │  ├─ 📁 (records)
│  │  │  ├─ 📁 (guest)
│  │  │  │  ├─ 📄 selectVisit.tsx (3.7 KB)
│  │  │  │  └─ 📄 _layout.tsx (0.6 KB)
│  │  │  ├─ 📁 (canvas)
│  │  │  │  ├─ 📄 Canvas.tsx (4.3 KB)
│  │  │  │  ├─ 📄 GuestData.tsx (7.0 KB)
│  │  │  │  └─ 📄 _layout.tsx (1.1 KB)
│  │  │  ├─ 📁 (auth)
│  │  │  │  ├─ 📄 loginPage.tsx (1.5 KB)
│  │  │  │  └─ 📄 _layout.tsx (0.4 KB)
│  │  │  ├─ 📁 (admin)
│  │  │  │  ├─ 📄 Dashboard.tsx (1.3 KB)
│  │  │  │  ├─ 📄 RecordDetailScreen.tsx (6.2 KB)
│  │  │  │  ├─ 📄 StatsCard.tsx (1.2 KB)
│  │  │  │  ├─ 📄 UpcomingTimeline.tsx (2.2 KB)
│  │  │  │  ├─ 📄 VisitorRow.tsx (2.0 KB)
│  │  │  │  └─ 📄 _layout.tsx (1.7 KB)
│  │  │  ├─ 📄 global.css (0.1 KB)
│  │  │  ├─ 📄 index.tsx (2.6 KB)
│  │  │  ├─ 📄 modal.tsx (0.7 KB)
│  │  │  ├─ 📄 RootStack.tsx (2.3 KB)
│  │  │  └─ 📄 _layout.tsx (0.8 KB)
│  │  ├─ 📁 .vscode
│  │  │  ├─ 📊 extensions.json (0.0 KB)
│  │  │  └─ 📊 settings.json (0.1 KB)
│  │  ├─ 📄 .env (0.0 KB)
│  │  ├─ 📄 .gitignore (0.4 KB)
│  │  ├─ 💻 app.config.js (1.4 KB)
│  │  ├─ 💻 babel.config.js (0.3 KB)
│  │  ├─ 💻 eslint.config.js (0.2 KB)
│  │  ├─ 💻 expo-env.d.ts (0.1 KB)
│  │  ├─ 📜 folder-structure.md (4.6 KB)
│  │  ├─ 💻 metro.config.js (0.2 KB)
│  │  ├─ 💻 nativewind-env.d.ts (0.0 KB)
│  │  ├─ 📊 package-lock.json (534.9 KB)
│  │  ├─ 📊 package.json (2.3 KB)
│  │  ├─ 📜 README.md (1.7 KB)
│  │  ├─ 💻 tailwind.config.js (0.7 KB)
│  │  └─ 📊 tsconfig.json (0.3 KB)
│  └─ 📁 backend
│     ├─ 📁 src
│     │  ├─ 📁 utils
│     │  │  ├─ 💻 cloudinary.ts (1.5 KB)
│     │  │  └─ 💻 generateToken.ts (0.5 KB)
│     │  ├─ 📁 types
│     │  │  ├─ 📁 express
│     │  │  │  └─ 💻 index.d.ts (0.2 KB)
│     │  │  ├─ 💻 Employee.ts (0.1 KB)
│     │  │  └─ 💻 FeedbackRecord.ts (0.1 KB)
│     │  ├─ 📁 services
│     │  │  └─ 💻 record.service.js (0.2 KB)
│     │  ├─ 📁 routes
│     │  │  ├─ 💻 Auth.routes.ts (0.2 KB)
│     │  │  ├─ 💻 Delivery.routes.ts (0.4 KB)
│     │  │  ├─ 💻 Employee.routes.ts (1.4 KB)
│     │  │  ├─ 💻 records.routes.ts (0.4 KB)
│     │  │  ├─ 💻 visitor.routes.ts (0.8 KB)
│     │  │  └─ 💻 visits.routes.ts (0.6 KB)
│     │  ├─ 📁 models
│     │  │  ├─ 💻 attachment.model.ts (0.9 KB)
│     │  │  ├─ 💻 delivery.model.ts (1.0 KB)
│     │  │  ├─ 💻 employees.model.ts (2.3 KB)
│     │  │  ├─ 💻 FeedbackRecord.model.ts (0.8 KB)
│     │  │  ├─ 💻 organizations.model.ts (0.9 KB)
│     │  │  ├─ 💻 sharedSchemas.ts (0.5 KB)
│     │  │  ├─ 💻 visitor.model.ts (0.9 KB)
│     │  │  └─ 💻 visits.model.ts (2.0 KB)
│     │  ├─ 📁 middleware
│     │  │  ├─ 💻 auth.middleware.ts (1.5 KB)
│     │  │  └─ 💻 multer.middleware.ts (0.1 KB)
│     │  ├─ 📁 controllers
│     │  │  ├─ 💻 Auth.controller.ts (3.4 KB)
│     │  │  ├─ 💻 Delivery.controller.ts (2.3 KB)
│     │  │  ├─ 💻 Employee.controller.ts (8.7 KB)
│     │  │  ├─ 💻 Record.controller.ts (3.2 KB)
│     │  │  ├─ 💻 Visit.controller.ts (5.9 KB)
│     │  │  └─ 💻 Visitor.controller.ts (6.3 KB)
│     │  ├─ 📁 config
│     │  │  └─ 💻 db.ts (0.3 KB)
│     │  ├─ 💻 app.ts (1.6 KB)
│     │  └─ 💻 server.ts (0.3 KB)
│     ├─ 📁 dist
│     │  ├─ 📁 utils
│     │  │  ├─ 💻 cloudinary.js (1.6 KB)
│     │  │  └─ 💻 generateToken.js (0.8 KB)
│     │  ├─ 📁 types
│     │  │  ├─ 💻 Employee.js (0.2 KB)
│     │  │  └─ 💻 FeedbackRecord.js (0.1 KB)
│     │  ├─ 📁 routes
│     │  │  ├─ 💻 Auth.routes.js (0.4 KB)
│     │  │  ├─ 💻 Delivery.routes.js (0.6 KB)
│     │  │  ├─ 💻 Employee.routes.js (1.9 KB)
│     │  │  ├─ 💻 records.routes.js (0.6 KB)
│     │  │  ├─ 💻 visitor.routes.js (1.2 KB)
│     │  │  └─ 💻 visits.routes.js (0.8 KB)
│     │  ├─ 📁 models
│     │  │  ├─ 💻 attachment.model.js (2.3 KB)
│     │  │  ├─ 💻 delivery.model.js (2.5 KB)
│     │  │  ├─ 💻 employees.model.js (3.5 KB)
│     │  │  ├─ 💻 FeedbackRecord.model.js (1.1 KB)
│     │  │  ├─ 💻 organizations.model.js (2.3 KB)
│     │  │  ├─ 💻 sharedSchemas.js (0.7 KB)
│     │  │  ├─ 💻 visitor.model.js (2.3 KB)
│     │  │  └─ 💻 visits.model.js (3.4 KB)
│     │  ├─ 📁 middleware
│     │  │  ├─ 💻 auth.middleware.js (1.6 KB)
│     │  │  └─ 💻 multer.middleware.js (0.4 KB)
│     │  ├─ 📁 controllers
│     │  │  ├─ 💻 Auth.controller.js (4.0 KB)
│     │  │  ├─ 💻 Delivery.controller.js (2.6 KB)
│     │  │  ├─ 💻 Employee.controller.js (9.1 KB)
│     │  │  ├─ 💻 Record.controller.js (3.4 KB)
│     │  │  ├─ 💻 Visit.controller.js (5.9 KB)
│     │  │  └─ 💻 Visitor.controller.js (6.2 KB)
│     │  ├─ 📁 config
│     │  │  └─ 💻 db.js (0.7 KB)
│     │  ├─ 💻 app.js (2.1 KB)
│     │  └─ 💻 server.js (0.5 KB)
│     ├─ 📄 .env (0.3 KB)
│     ├─ 📄 .gitignore (0.0 KB)
│     ├─ 📊 package-lock.json (80.7 KB)
│     ├─ 📊 package.json (1.0 KB)
│     └─ 📊 tsconfig.json (0.9 KB)
├─ 📁 .vscode
│  └─ 📊 settings.json (0.1 KB)
├─ 📁 .turbo
│  ├─ 📁 preferences
│  │  └─ 📊 tui.json (0.0 KB)
│  ├─ 📁 daemon
│  │  └─ 📄 ba767bb889e93d65-turbo.log.2025-12-19 (0.6 KB)
│  ├─ 📁 cookies
│  │  └─ 📄 1.cookie (0.0 KB)
│  └─ 📁 cache
├─ 📄 .gitignore (0.4 KB)
├─ 📄 .npmrc (0.0 KB)
├─ 📜 folder-structure.md (335.5 KB)
├─ 📊 package.json (0.4 KB)
├─ 📄 pnpm-lock.yaml (465.7 KB)
├─ 📄 pnpm-workspace.yaml (0.0 KB)
├─ 📜 README.md (7.2 KB)
└─ 📊 turbo.json (0.4 KB)

```
