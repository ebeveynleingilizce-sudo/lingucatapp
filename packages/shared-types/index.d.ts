export type QuestionType='multiple'|'vocabulary'|'speaker'|'boolean'|'order'|'grammar';
export interface Question { id:string;type:QuestionType;prompt:string;hint:string;feedback:string;scene:{label:string;start:number;end:number};options:string[];answer:number|number[]; }
export type ContentKind='video'|'song'|'activity'|'question'|'appearance'|'media';
export interface ContentRecord {id:string;kind:ContentKind;title:string;description:string;grade:number;grades?:number[];cefrLevels?:('A1'|'A2'|'B1'|'B2'|'C1'|'C2')[];unit:string;tags:string[];links:string[];order:number;source:string;cover:string;payload:unknown;}
export interface CmsDocument {draft:ContentRecord;published:ContentRecord|null;revision:number;status:'draft'|'published'|'archived';updatedAt:unknown;}
// Runtime validation: packages/shared-content/schema.js. Student and admin use the same engine.js.
