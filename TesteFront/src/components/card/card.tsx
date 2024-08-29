import { formatDate } from '../formatDate'
import './card.css'

interface CardProps{
    id: number,
    title: string,
    description: string
    date: Date
}

export function Card( {title, description, date} : CardProps){
    return(
        <div className="card">
            <h2>{title}</h2>
            <p><b>{description}</b></p>
            <p><b>{date.toString()}</b></p>
        </div>
    )
}