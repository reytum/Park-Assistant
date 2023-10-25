interface AllotmentResponse {
    slotId: number;
    floorId: number;
    floorName: string | null;
    slotName: string | null;
    level: number
    slot: string | null;
}

interface ReleaseResponse {
    message: string;
}