import styles from '@/styles/Order-Details.module.css'

export default function DetailRow({leftLabel, rightLabel}: {leftLabel: string, rightLabel: string}) {
    return (
        <div className='row'>
            <div className='col'>
                {leftLabel}
            </div>
            <div className='col-4'>
                {rightLabel}
            </div>
        </div>
    );
}