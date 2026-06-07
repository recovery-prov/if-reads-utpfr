module.exports = [
"[project]/src/interface/web/app/api/reviews.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reviewsApi",
    ()=>reviewsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/zod/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/app/api/client/axiosClient.ts [app-ssr] (ecmascript)");
;
;
const ReviewSchema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    rating: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5),
    comment: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().nullable(),
    narrative: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5),
    interactivity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5),
    originality: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5),
    fictionId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    authorId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    author: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string()
    }),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string()
});
const CreateReviewInput = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    rating: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5),
    comment: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().optional(),
    narrative: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5),
    interactivity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5),
    originality: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5)
});
const UpdateReviewInput = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    rating: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5).optional(),
    comment: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().optional(),
    narrative: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5).optional(),
    interactivity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5).optional(),
    originality: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().int().min(1).max(5).optional()
});
const PaginatedReviewsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    data: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].array(ReviewSchema),
    total: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number()
});
const reviewsApi = {
    findAll: async (fictionId, page = 1, limit = 10)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/fictions/${fictionId}/reviews`, {
            params: {
                page,
                limit
            }
        });
        return response.data;
    },
    create: async (fictionId, data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/fictions/${fictionId}/reviews`, data);
        return response.data;
    },
    update: async (fictionId, id, data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/fictions/${fictionId}/reviews/${id}`, data);
        return response.data;
    },
    remove: async (fictionId, id)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/fictions/${fictionId}/reviews/${id}`);
    }
};
}),
"[project]/src/interface/web/components/review-section.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReviewSection",
    ()=>ReviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/components/ui/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-ssr] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$reviews$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/app/api/reviews.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const SUB_RATINGS = [
    {
        key: 'narrative',
        label: 'Narrative'
    },
    {
        key: 'interactivity',
        label: 'Interactivity'
    },
    {
        key: 'originality',
        label: 'Originality'
    }
];
function ReviewSection({ storyId, reviews }) {
    const [showWriteReview, setShowWriteReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [subRatings, setSubRatings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        narrative: 0,
        interactivity: 0,
        originality: 0
    });
    const [hoverRatings, setHoverRatings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        narrative: 0,
        interactivity: 0,
        originality: 0
    });
    const [reviewText, setReviewText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const overallRating = Object.values(subRatings).every((v)=>v > 0) ? parseFloat((Object.values(subRatings).reduce((a, b)=>a + b, 0) / 3).toFixed(1)) : 0;
    const handleSubmitReview = async ()=>{
        if (overallRating === 0 || reviewText.trim() === '') return;
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$reviews$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reviewsApi"].create(parseInt(storyId), {
                rating: Math.round(overallRating),
                narrative: subRatings.narrative,
                interactivity: subRatings.interactivity,
                originality: subRatings.originality,
                comment: reviewText.trim() || undefined
            });
            setShowWriteReview(false);
            setSubRatings({
                narrative: 0,
                interactivity: 0,
                originality: 0
            });
            setReviewText('');
        } catch (err) {
            setSubmitError('Falha ao enviar review. Verifique se você está autenticado.');
            console.error('Failed to submit review:', err);
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "max-w-4xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-serif font-semibold text-foreground flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                className: "w-5 h-5 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            "Reviews"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setShowWriteReview(!showWriteReview),
                        className: "bg-primary text-primary-foreground hover:bg-primary/90",
                        children: "Write a Review"
                    }, void 0, false, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/interface/web/components/review-section.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            showWriteReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 p-6 rounded-2xl bg-card border border-border/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-foreground mb-4",
                        children: "Your Review"
                    }, void 0, false, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm text-muted-foreground block",
                                children: "Ratings"
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            SUB_RATINGS.map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-muted-foreground w-24 shrink-0",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/src/interface/web/components/review-section.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                [
                                                    1,
                                                    2,
                                                    3,
                                                    4,
                                                    5
                                                ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSubRatings((prev)=>({
                                                                    ...prev,
                                                                    [key]: star
                                                                })),
                                                        onMouseEnter: ()=>setHoverRatings((prev)=>({
                                                                    ...prev,
                                                                    [key]: star
                                                                })),
                                                        onMouseLeave: ()=>setHoverRatings((prev)=>({
                                                                    ...prev,
                                                                    [key]: 0
                                                                })),
                                                        className: "p-0.5 transition-transform hover:scale-110",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: `w-5 h-5 transition-colors ${star <= (hoverRatings[key] || subRatings[key]) ? 'fill-primary text-primary' : 'text-muted-foreground/30 hover:text-muted-foreground/50'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/interface/web/components/review-section.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, star, false, {
                                                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 21
                                                    }, this)),
                                                subRatings[key] > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1 text-xs text-muted-foreground",
                                                    children: [
                                                        subRatings[key],
                                                        "/5"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/interface/web/components/review-section.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/interface/web/components/review-section.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/src/interface/web/components/review-section.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this)),
                            overallRating > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground pt-1",
                                children: [
                                    "Overall:",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-foreground font-medium",
                                        children: [
                                            overallRating,
                                            "/5"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm text-muted-foreground mb-2 block",
                                children: "Your thoughts"
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                value: reviewText,
                                onChange: (e)=>setReviewText(e.target.value),
                                placeholder: "Share your experience with this story...",
                                className: "min-h-30 bg-secondary/50 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-3",
                        children: [
                            submitError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-destructive self-center mr-auto",
                                children: submitError
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>setShowWriteReview(false),
                                className: "bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handleSubmitReview,
                                disabled: overallRating === 0 || reviewText.trim() === '' || isSubmitting,
                                className: "bg-primary text-primary-foreground hover:bg-primary/90",
                                children: isSubmitting ? 'Enviando...' : 'Submit Review'
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/interface/web/components/review-section.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: reviews.map((review)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCard, {
                        review: review
                    }, review.id, false, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/interface/web/components/review-section.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            reviews.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    className: "bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground",
                    children: "Load More Reviews"
                }, void 0, false, {
                    fileName: "[project]/src/interface/web/components/review-section.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/interface/web/components/review-section.tsx",
                lineNumber: 205,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/interface/web/components/review-section.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function ReviewCard({ review }) {
    const [helpfulCount, setHelpfulCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(review.helpful);
    const [hasVoted, setHasVoted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleHelpful = ()=>{
        if (!hasVoted) {
            setHelpfulCount((prev)=>prev + 1);
            setHasVoted(true);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 rounded-2xl bg-card/50 border border-border/50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-secondary flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    className: "w-5 h-5 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/interface/web/components/review-section.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium text-foreground",
                                        children: review.user.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-muted-foreground",
                                        children: review.date
                                    }, void 0, false, {
                                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-0.5",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5
                                ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                        className: `w-4 h-4 ${star <= Math.round(review.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`
                                    }, star, false, {
                                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                                        lineNumber: 246,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-foreground",
                                children: review.rating
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/interface/web/components/review-section.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-x-6 gap-y-1.5 mb-4",
                children: SUB_RATINGS.map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground w-20",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-1 rounded-full bg-secondary/60",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-primary/70",
                                    style: {
                                        width: `${review[key] / 5 * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/interface/web/components/review-section.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground",
                                children: review[key]
                            }, void 0, false, {
                                fileName: "[project]/src/interface/web/components/review-section.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/src/interface/web/components/review-section.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/interface/web/components/review-section.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-foreground/90 leading-relaxed mb-4",
                children: review.content
            }, void 0, false, {
                fileName: "[project]/src/interface/web/components/review-section.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleHelpful,
                    disabled: hasVoted,
                    className: `flex items-center gap-2 text-sm transition-colors ${hasVoted ? 'text-primary cursor-default' : 'text-muted-foreground hover:text-foreground'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"], {
                            className: `w-4 h-4 ${hasVoted ? 'fill-primary' : ''}`
                        }, void 0, false, {
                            fileName: "[project]/src/interface/web/components/review-section.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this),
                        "Helpful (",
                        helpfulCount,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/interface/web/components/review-section.tsx",
                    lineNumber: 283,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/interface/web/components/review-section.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/interface/web/components/review-section.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/interface/web/app/api/middleware/users.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usersApi",
    ()=>usersApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/zod/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/app/api/client/axiosClient.ts [app-ssr] (ecmascript)");
;
;
const UserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().optional()
});
const FictionSummarySchema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().nullable(),
    genre: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().nullable(),
    publishedAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number().nullable(),
    link: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().nullable(),
    author: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string()
    }),
    authors: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
        role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string()
    }))
});
const FavoriteSchema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    fictionId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
    fiction: FictionSummarySchema
});
const ReviewWithFictionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    rating: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    comment: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().nullable(),
    narrative: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    interactivity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    originality: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    fictionId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
    fiction: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number(),
        title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string()
    })
});
const UpdateMeInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().min(1).optional(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string().email().optional()
});
const usersApi = {
    getMe: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/users/me');
        return response.data;
    },
    updateMe: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch('/users/me', data);
        return response.data;
    },
    changePassword: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch('/users/me/password', data);
        return response.data;
    },
    getFavorites: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/users/me/favorites');
        return response.data;
    },
    addFavorite: async (fictionId)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/users/me/favorites/${fictionId}`);
    },
    removeFavorite: async (fictionId)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/users/me/favorites/${fictionId}`);
    },
    getMyReviews: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$client$2f$axiosClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/users/me/reviews');
        return response.data;
    }
};
}),
"[project]/src/interface/web/components/favorite-button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FavoriteButton",
    ()=>FavoriteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$middleware$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/app/api/middleware/users.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function FavoriteButton({ fictionId }) {
    const [isFav, setIsFav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$middleware$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usersApi"].getFavorites().then((favs)=>{
            setIsFav(favs.some((f)=>f.fictionId === fictionId));
        }).catch(()=>{});
    }, [
        fictionId
    ]);
    const handleToggle = async ()=>{
        if (loading) return;
        setLoading(true);
        try {
            if (isFav) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$middleware$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usersApi"].removeFavorite(fictionId);
                setIsFav(false);
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$app$2f$api$2f$middleware$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usersApi"].addFavorite(fictionId);
                setIsFav(true);
            }
        } catch  {
        // 401 = não autenticado, ignorar
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        variant: "outline",
        className: `flex-1 border-border/50 hover:bg-secondary/50 transition-colors ${isFav ? 'bg-primary/10 text-primary border-primary/40 hover:bg-primary/20' : 'bg-secondary/30 text-foreground'}`,
        onClick: ()=>void handleToggle(),
        disabled: loading,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                className: `w-4 h-4 mr-2 transition-colors ${isFav ? 'fill-primary text-primary' : ''}`
            }, void 0, false, {
                fileName: "[project]/src/interface/web/components/favorite-button.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            isFav ? 'Favorited' : 'Favorite'
        ]
    }, void 0, true, {
        fileName: "[project]/src/interface/web/components/favorite-button.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript)");
}),
"[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ThumbsUp
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
            key: "emmmcr"
        }
    ],
    [
        "path",
        {
            d: "M7 10v12",
            key: "1qc93n"
        }
    ]
];
const ThumbsUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("thumbs-up", __iconNode);
;
 //# sourceMappingURL=thumbs-up.js.map
}),
"[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-ssr] (ecmascript) <export default as ThumbsUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThumbsUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-ssr] (ecmascript)");
}),
"[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MessageSquare
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
            key: "18887p"
        }
    ]
];
const MessageSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("message-square", __iconNode);
;
 //# sourceMappingURL=message-square.js.map
}),
"[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageSquare",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript)");
}),
"[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Heart
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
            key: "mvr1a0"
        }
    ]
];
const Heart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("heart", __iconNode);
;
 //# sourceMappingURL=heart.js.map
}),
"[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Heart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interface$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interface/web/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=src_interface_web_ff451f33._.js.map