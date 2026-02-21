import type { RefObject } from "react";

// セクションの種類を定義
export type SectionId = "home" | "about" | "portfolio" | "contact";

// 各セクションの参照を保持する型
export type SectionRefs = {
	[key in SectionId]: RefObject<HTMLElement | null>;
};
