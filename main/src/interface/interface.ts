
export type contentType = {
    id: number,
    title: string,
    description: string,
    content_type: string,
    content_type_title?: string,
    url?: string,
    source_id: number,
    format_id: number,
    section_id: number,
    source: string,
    format: string,
    topic_id: number
}

export interface MainObj {
    section_id: number,
    section_name: string,
    section_layout?: string,
    section_type: string,
    points?: number,
    content: contentType[] | newsInterface[] | quizInterface[] | gamesInterface[]
}[]

export interface newsInterface {
    // section_id: number,
    // section_name: string,
    // section_layout: string,
    // section_type: string,
    // content: {
    topic_id: number,
    title: string,
    description: string,
    source: {
        title: string,
        image: string,
    },
    publishedDate: string,
    link: string,
    image: string,
    category: string,
    newsId: string
}
// }

export interface quizInterface {
    // section_id: number,
    // section_layout: string,
    // section_type: string,
    // content: {
    id: number,
    title: string,
    social_proof_count: number,
    content_type: string
}
// }

export interface gamesInterface {
    // section_id: number,
    // section_name: string,
    // section_layout: string,
    // section_type: string,
    // content: {
    id: number,
    title: string,
    category: string,
    url: string,
    order: number,
    script: string,
    status: string,
    goal: string,
    instruction: null | string,
    isMuted: boolean,
    createdAt: string,
    updatedAt: string
}
// }