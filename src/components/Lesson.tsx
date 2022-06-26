import {CheckCircle, Lock} from "phosphor-react"
import {isPast, format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import {Link, useParams} from "react-router-dom"
import classNames from "classnames"

interface LessonProps {
    title: string
    slug: string
    availableAt: Date
    type: 'live' | 'class'
}

export const Lesson = (props: LessonProps) => {
    const {slug} = useParams<{ slug: string }>()

    const isLessonAvailable = isPast(props.availableAt)
    const availableDateFormated = format(props.availableAt, "EEE ' • ' d' de 'MMM' • 'k'h'mm", {
        locale: ptBR
    })

    const isActiveLesson = slug === props.slug

    return (
        <Link to={isLessonAvailable ? `/event/lesson/${props.slug}` : ''}
              className={classNames('group', {
                  'linkDisabled': !isLessonAvailable
              })}>
            <span className="text-gray-300">
                {availableDateFormated}
            </span>

            <div
                className={
                    classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                        'bg-green-700': isActiveLesson
                    })
                }>
                <header className="flex items-center justify-between">

                    {isLessonAvailable ? (
                        <span className={classNames('text-sm text-blue-500 font-medium flex items-center gap-2', {
                            'text-white': isActiveLesson
                        })
                        }>
                        < CheckCircle size={20}/>
                            Conteudo Liberado
                        </span>
                    ) : (
                        <span
                            className={classNames('text-sm text-orange-500 font-medium flex items-center gap-2`', {
                                'text-white': isActiveLesson
                            })
                            }>
                        <Lock size={20}/>
                            Em breve
                        </span>
                    )}

                    <span
                        className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold', {
                            'border-white': isActiveLesson
                        })
                        }>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className="text-gray-200 mt-5 block">
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}