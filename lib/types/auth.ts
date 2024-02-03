export interface AuthRequest{
    username: string;
    password: string;
}

export interface Pagination {
    last: boolean
    first: boolean
    size: number
    empty: boolean
    total_pages: number
    current_page: number
    current_total_elements: number
    total_elements: number
}