// @ts-check

import { Locator, Page } from "@playwright/test";

export class lambda_homepageLocator{

    readonly page:Page;
    readonly dragEle1:Locator;
    readonly dragEle2:Locator;

    readonly dragToEle : Locator;

    readonly droppedEle1 :Locator;
    readonly droppedEle2 : Locator;


    readonly dragtoTarget : Locator;
    readonly dropHere :Locator;


    constructor(page:Page){
        this.page=page;
        this.dragEle1 = page.locator('#todrag').getByText('Draggable 1');
        this.dragEle2 = page.locator('#todrag').getByText('Draggable 2');
        this.dragToEle = page.locator('#mydropzone');

        this.droppedEle1 = page.locator('#droppedlist').getByText('Draggable 1')
        this.droppedEle2 = page.locator('#droppedlist').getByText('Draggable 2')


        this.dragtoTarget = page.locator('#draggable').getByText('Drag me to my target');
        this.dropHere = page.locator('#droppable').getByText('Drop here');

    }
}