import { useGameState } from "../../../../storage/game-state.js";
import { useEffect, useState } from "react";
import { Modal } from "../modal";

export const StatsModal = () => {
    const statsVisible = useGameState((s) => s.statsVisible);
    const character = useGameState((s) => s.character);
    const setStatsVisible = useGameState((s) => s.setStatsVisible);
    const [stats, setStats] = useState({hp:0, armor:0, maxHp:0, maxArmor:0});

    useEffect(() => {
        const handler = (e) => {
            if (e.detail) {
                setStats({
                    hp: e.detail.hp,
                    armor: e.detail.armor,
                    maxHp: e.detail.maxHp,
                    maxArmor: e.detail.maxArmor,
                });
            }
        };
        window.addEventListener('self-update', handler);
        return () => window.removeEventListener('self-update', handler);
    }, []);

    return (
        <Modal
            open={statsVisible}
            title={`${character?.classType || ''} stats`}
            onChange={(open) => setStatsVisible(open)}
            size="sm"
            actions={[]}
        >
            <div className="flex flex-col gap-1">
                <p>HP: {stats.hp} / {stats.maxHp}</p>
                <p>Armor: {stats.armor} / {stats.maxArmor}</p>
            </div>
        </Modal>
    );
};
