import { useGameState } from '../../../storage/game-state.js';
import Image from 'next/image';
import { assetUrl } from '../../utilities/assets';
import './ComboPoints.css';

export const ComboPoints = () => {
    const buffs = useGameState((s) => s.buffs);
    const character = useGameState((s) => s.character);
    if (!character || character.name !== 'rogue') return null;
    const combo = buffs.find(b => b.type === 'combo');
    const count = combo?.stacks || 0;
    return (
        <div className="combo-points">
            {Array.from({ length: 5 }).map((_, idx) => (
                <Image
                    key={idx}
                    src={assetUrl('/icons/classes/rogue/combo_point.jpg')}
                    alt="Combo Point"
                    width={24}
                    height={24}
                    className={idx < count ? 'active' : ''}
                />
            ))}
        </div>
    );
};
