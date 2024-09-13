
import SmallBlock from "../SmallBlock/SmallBlock";
import styles from "./clock.module.css";
export default function Clock() {

    function getDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');

        // Get time components
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const formattedDate = `${month}.${day}.${year}`;
        const formattedTime = `${hours}:${minutes}`;

        const formattedDateTime = `${formattedDate}, ${formattedTime}`;
        return formattedDateTime;
    }

    return (
        <div className={styles.container}>
            <div className={styles.clock}>
                <SmallBlock>
                    Today, it is {getDateTime()}
                </SmallBlock>
            </div>
        </div>
    )
}
