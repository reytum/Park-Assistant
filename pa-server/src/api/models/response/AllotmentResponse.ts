interface AllotmentResponse {
    slotId: number;
    floorId: number;
    floorName: string | null;
    slotName: string | null;
    level: number
    slot: string | null;
    slotSize: number;
}

interface ReleaseResponse {
    message: string;
}