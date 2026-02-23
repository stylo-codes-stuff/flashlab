

export class checkbox extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,labeltext){
        super(scene,x,y,'checkbox')
        scene.add.existing(this)
        this.label = scene.add.text(x+20,y-8,labeltext)
        this.checked = false;
        this.setInteractive()
        this.on('pointerup',()=>{
            if(this.checked == false){
                this.checked = !this.checked;
                this.setTexture('checkbox',1)
            }else{
                this.checked = !this.checked;
                this.setTexture('checkbox',2)
                
            }
            console.log(this.checked)
        })
    }
}

export class textbox extends Phaser.GameObjects.Text{
    constructor(scene,x,y,default_message,textStyle,prefix){
        super(scene,x,y,prefix+default_message,textStyle)
        this.setInteractive()
        scene.add.existing(this)
        this.selected = false;
        this.on('pointerdown',()=>{
            if (this.selected == false){
            this.text = prefix
            this.selected = true
            }
        })
        scene.input.keyboard.on('keydown', (event) => {
            if(this.selected == true && parseInt(event.key)){
            this.text += event.key
            }
            if(this.selected == true && event.key == 'Enter'){
                this.selected = false;
                if(this.text != prefix){
                    this.value = Number(this.text);
                    
                }
                if (this.text == prefix){
                    this.text = prefix + default_message
                }
            }

        })
    }
    
}
export class settingsMenu extends Phaser.GameObjects.Container{
    constructor(scene,x,y){
        super(scene,x,y)
        this.hidden = false
        this.bg = scene.add.graphics()
        this.bg.fillStyle(0x000000,.5)
        this.bg.fillRoundedRect()
        this.statsForNerds = new checkbox(scene,x,y,'Stats For Nerds')
        this.add([this.bg,this.statsForNerds])
    }
        
}
export class bodyParamsMenu extends Phaser.GameObjects.Container{
    constructor(body){
        this.xtext = new textbox()
    }
}