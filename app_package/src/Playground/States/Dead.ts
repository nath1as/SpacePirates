import { Control, Image, Grid, Button, StackPanel, TextBlock } from "@babylonjs/gui";
import { State } from "./State";
import { States } from "./States";
import { GameState } from "./GameState";
import { Nullable } from "@babylonjs/core";
import { Ship, Statistics } from "../Ship";
import { InputManager } from "../Inputs/Input";
import { GuiFramework } from "../GuiFramework";

export class Dead extends State {
    public ship: Nullable<Ship> = null;
    public exit() {
        super.exit();
    }

    public enter() {
        super.enter();
        if (!this._adt) {
            return;
        }

        InputManager.disablePointerLock();

        GuiFramework.createBottomBar(this._adt);
        let stats = new StackPanel();
        var panel = new StackPanel();
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        let grid = new Grid();
        GuiFramework.formatButtonGrid(grid);
        grid.addControl(panel, 0, 0);
        GuiFramework.createTextPanel(grid);
        grid.addControl(stats, 0, 1);

        this._addText("Wasted !!!", stats);
        if (this.ship && this.ship.statistics) {
            const s = this.ship.statistics;
            this._addText("Damage dealt :" + s.damageDealt, stats);
            this._addText("Damage taken :" + s.damageTaken, stats);
            this._addText("Ships destroyed :" + s.shipsDestroyed, stats);
            this._addText("Time of battle :" + Math.round(s.timeOfBattle/1000)+" seconds", stats);
            this._addText("Shots fired :" + s.shotFired, stats);
            this._addText("Shots hitting :" + s.shotHitting, stats);
            this._addText("Missiles fired :" + s.missilesFired, stats);
            this._addText("Allies Asteroid Crash: " + Statistics.alliesCrash, stats);
            this._addText("Enemies Asteroid Crash: " + Statistics.enemiesCrash, stats);
        }

        GuiFramework.addButton("Try again", panel).onPointerDownObservable.add(function(info) {
            GameState.gameSession?.stop();
            State.setCurrent(States.gameState);
        });

        GuiFramework.addButton("Main menu", panel).onPointerDownObservable.add(function(info) {
            GameState.gameSession?.stop();
            State.setCurrent(States.main);
        });

        this._adt.addControl(grid);
    }
}