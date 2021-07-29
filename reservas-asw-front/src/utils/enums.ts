export enum RouteName {
    RoomsList = '/admin/rooms/list',
    RoomView = '/admin/rooms/view',
    RoomAdd = '/admin/rooms/add', 

    WorkstationList = '/admin/workstations/list',
    WorkstationView = '/admin/workstations/view',
    WorkstationAdd = '/admin/workstations/add',
    WorkstationEdit = '/admin/workstations/edit',

    RoomEdit = '/admin/rooms/edit',
    AdminsList = '/admin/admins/list',
    AdminView = '/admin/admins/view',
    AdminAdd = '/admin/admins/add',
    AdminEdit = '/admin/admins/edit',
    BranchesList = '/admin/branches/list',
    BranchView = '/admin/branches/view',
    BranchEdit = '/admin/branches/edit',
    BranchAdd ='/admin/branches/add',
    SchedulesList = '/admin/schedules/list',
    ScheduleView = '/admin/schedules/view',
    ScheduleAdd = '/admin/schedules/add',
    ScheduleEdit = '/admin/schedules/edit',
    DomainsList = "/admin/domains/list",
    DomainAdd = "/admin/domains/add",
    DomainEdit = "/admin/domains/edit",
    DomainView = "/admin/domains/view",
    
    }

export enum RouteFloor {
    FloorList = '/admin/floors/list',
    FloorView = '/admin/floors/view',
    FloorAdd = '/admin/floors/add',
    FloorEdit = '/admin/floors/edit',
}

export enum WorkStationState {
    Active = 'A',
    Inactive = 'I'
}

export enum WorkStationType {
    Gerente = 'G',
    PuestoTrabajo = 'PT'
}

export enum DateValidationType {
    DayCapacity,
    ParkingAvailabilityPerMotorcycle,
    ParkingAvailabilityPerCar,
    ParkingAvailabilityPerBicycle,
}

 
export enum ReservationAction {
    Edit,
    ViewSummary
}
