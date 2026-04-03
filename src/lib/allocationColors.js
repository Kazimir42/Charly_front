export const ALLOCATION_COLORS = [
    '#3B82F6',
    '#6366F1',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
]

export function getAllocationColor(index, total) {
    return ALLOCATION_COLORS[
        Math.floor((index / total) * ALLOCATION_COLORS.length)
    ]
}
