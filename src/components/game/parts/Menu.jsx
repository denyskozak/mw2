import { useGameState } from "../../../storage/game-state.js";
import { useRouter } from "next/navigation";
import { ButtonWithSound as Button } from "../button-with-sound";
import "./Menu.css";

export const GameMenu = () => {
    const menuVisible = useGameState((s) => s.menuVisible);
    const setMenuVisible = useGameState((s) => s.setMenuVisible);
    const router = useRouter();

    if (!menuVisible) return null;

    const closeMenu = () => setMenuVisible(false);

    return (
        <div className="menu-overlay flex flex-col gap-2">
            <Button className="menu-button" onPress={() => {}}>
                Graphics
            </Button>
            <Button className="menu-button" onPress={() => {}}>
                General Settings
            </Button>
            <Button className="menu-button" onPress={() => router.push('/play')}>
                Exit Game
            </Button>
            <Button className="menu-button" onPress={closeMenu} color="primary">
                Return to Game
            </Button>
        </div>
    );
};
