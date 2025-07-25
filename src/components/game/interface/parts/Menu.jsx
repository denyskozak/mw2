import { useGameState } from "../../../../storage/game-state.js";
import { ButtonWithSound as Button } from "../../../button-with-sound";
import "./Menu.css";

export const GameMenu = () => {
    const menuVisible = useGameState((s) => s.menuVisible);
    const setMenuVisible = useGameState((s) => s.setMenuVisible);

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
            <Button className="menu-button" onPress={() => {}}>
                Exit Game
            </Button>
            <Button className="menu-button" onPress={closeMenu} color="primary">
                Return to Game
            </Button>
        </div>
    );
};
