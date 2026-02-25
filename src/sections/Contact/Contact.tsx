import styles from "./Contact.module.css";
import { motion, useScroll, useTransform } from "motion/react";
import car from "../../assets/car.png";

const links = [
	{
		name: "X (Twitter)",
		id: "@mimimiT193",
		url: "https://x.com/mimimiT193",
		tag: "Updates",
		icon: "fa-x-twitter",
		prefix: "fa-brands",
	},
	{
		name: "LinkedIn",
		id: "Tsukamoto Ikumi",
		url: "https://linkedin.com/in/tsukamotoikumi",
		tag: "Career",
		icon: "fa-linkedin-in",
		prefix: "fa-brands",
	},
	{
		name: "GitHub",
		id: "tkmt193",
		url: "https://github.com/tkmt193",
		tag: "Code",
		icon: "fa-github",
		prefix: "fa-brands",
	},
	{
		name: "Gmail",
		id: "tsukamoto.ikumi@gmail.com",
		url: "mailto:tsukamoto.ikumi@gmail.com",
		tag: "Inquiry",
		icon: "fa-envelope",
		prefix: "fa-regular",
	},
];

export default function Contact({
	ref,
}: {
	ref: React.RefObject<HTMLElement | null>;
}) {
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});

	const xBackground = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);

	return (
		<section ref={ref} className={styles.container}>
			<div className={styles.stickyWrapper}>
				<div className={styles.baseContent}>
					<p className={styles.contactText}>
						Please feel free to contact us. We will usually respond ASAP.
					</p>
				</div>

				<motion.div style={{ x: xBackground }} className={styles.bgPanel}>
					<div className={styles.innerContent}>
						<div className={styles.header}>
							<h1>CONTACT</h1>
							<p>
								Please feel free to contact us. We will usually respond ASAP.
							</p>
						</div>
						<div className={styles.linkList}>
							{links.map((link) => (
								<a
									key={link.name}
									href={link.url}
									target="_blank"
									rel="noopener"
									className={styles.linkItem}
								>
									<div className={styles.iconBox}>
										<i className={`${link.prefix} ${link.icon}`}></i>
									</div>
									<div className={styles.info}>
										<span className={styles.linkName}>{link.name}</span>
										<span className={styles.linkId}>{link.id}</span>
									</div>
									<span className={styles.labelTag}>{link.tag}</span>
								</a>
							))}
						</div>
					</div>
					<motion.div
						className={styles.carWrapper}
						initial={{ opacity: 0, y: "-50%", x: "-10%" }}
						whileInView={{
							opacity: 1,
							x: "0%",
							y: ["-50%", "-53%", "-50%", "-47%", "-50%"],
						}}
						transition={{
							opacity: {
								duration: 0.5,
								ease: "easeInOut",
							},
							x: {
								duration: 0.5,
								ease: "easeInOut",
							},
							y: {
								duration: 0.8,
								repeat: Infinity,
								ease: "linear",
							},
						}}
						viewport={{ once: true, amount: 0.8 }}
					>
						<img src={car} alt="走行する車" className={styles.carImage} />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
