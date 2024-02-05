export interface MainObj {
    section_id: number,
    section_name: string,
    section_layout: string,
    section_type: string,
    content: [
        {
            id: number,
            title: string,
            description: string,
            content_type: string,
            content_type_title: string,
            source_id: number,
            format_id: number,
            section_id: number,
            source: string,
            format: string,
        }
    ]
}