import {useGameState} from "../../../../storage/game-state.js";
import './Scoreboard.css';

export const Scoreboard = () => {
    const scoreboardVisible = useGameState((s) => s.scoreboardVisible);
    const scoreboardData = useGameState((s) => s.scoreboardData);

    if (!scoreboardVisible) return null;

    return (
        <div className="scoreboard-overlay">
            <table className="scoreboard-table">
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Kills</th>
                    <th>Deaths</th>
                    <th>Assists</th>
                    <th>Damage</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {scoreboardData.map((p) => (
                    <tr key={p.id}>
                        <td>{`Player ${p.id}`}</td>
                        <td>{p.kills}</td>
                        <td>{p.deaths}</td>
                        <td>{p.assists}</td>
                        <td>{p.damage}</td>
                        <td>{p.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
