import { useDashboardData } from '@/hooks/dashboard'
import { useHistoryData } from '@/hooks/history'

export const useStatsData = () => {
    const { getDashboard } = useDashboardData()
    const { getHistory } = useHistoryData()

    const getStatsData = async () => {
        const [dashboardData, historyData] = await Promise.all([
            getDashboard(),
            getHistory(),
        ])

        return {
            dashboard: dashboardData,
            history: historyData,
        }
    }

    return { getStatsData }
}
