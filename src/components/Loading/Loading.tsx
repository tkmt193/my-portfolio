import Coffee from "../Coffee/Coffee";
import styles from "./Loading.module.css";
import * as motion from "motion/react-client";

const words = "Loading...";

const wordList = words.split("").map((char, index) => ({
	id: index,
	content: char,
}));

const textanimate = wordList.map((word) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }}
			transition={{
				duration: 3,
				delay: word.id * 0.2,
				repeat: Infinity,
				ease: "easeInOut",
			}}
			key={word.id}
		>
			{word.content}
		</motion.div>
	);
});

export default function Loading({ active }: { active: boolean }) {
	return (
		<div className={`${styles.loading} ${active ? styles.active : ""}`}>
			<Coffee />
			<p className={styles.text}>{textanimate}</p>
		</div>
	);
}
