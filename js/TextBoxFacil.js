var TextBoxFacilJs = {htmlElement: null, isOpen: false, animationms: 200};

TextBoxFacilJs.saveState = function()
{
    let data = '0';
    let ob = $('#textboxfacil-textarea');
    if(ob.hasClass('textboxfacil-textarea-md'))
        data = '1';
    else if(ob.hasClass('textboxfacil-textarea-lg'))
        data = '2';

    ob = $('#textboxfacil-block');
    if(ob.hasClass('textboxfacil-block-all'))
        data += 'F';
    else if(ob.hasClass('textboxfacil-block-up'))
        data += 'U';
    else data += 'D';

    localStorage.setItem("textboxfacil-ls", data);
    if(data === '0D')
        localStorage.removeItem("textboxfacil-ls"); //default value is not saved
}

TextBoxFacilJs.restoreState = function()
{
    let data = localStorage.getItem("textboxfacil-ls");
    if(data == null) data = '0D'; //default value
    switch(data[0])
    {
        case '0': TextBoxFacilJs.ConsoleTASize(); break;
        case '1': TextBoxFacilJs.ConsoleTASize(2); break;
        case '2': TextBoxFacilJs.ConsoleTASize(3);
    }

    switch(data[1])
    {
        case 'F': TextBoxFacilJs.ConsoleLocation_Full(); break;
        case 'U': TextBoxFacilJs.ConsoleLocation_Up(); break;
        case 'D': TextBoxFacilJs.ConsoleLocation_Down();
    }
}

TextBoxFacilJs.ConsoleTASize = function(size = 1)
{
    let ob = $('#textboxfacil-textarea');
    ob.removeClass('textboxfacil-textarea-md');
    ob.removeClass('textboxfacil-textarea-lg');
    if(size == 2)
        ob.addClass('textboxfacil-textarea-md');
    else if(size == 3)
        ob.addClass('textboxfacil-textarea-lg');

    //save current settings
    TextBoxFacilJs.saveState();
}

TextBoxFacilJs.ConsoleLocation_Down = function()
{
    let con = $('#textboxfacil-block');
    let link = $('#textboxfacil-btn-up');
    let icon = $('#textboxfacil-btn-up span i');
    
    link.removeClass('d-none'); //if button is hidden
    icon.removeClass('fa-caret-down'); //remove up-state icon
    icon.addClass('fa-caret-up'); //add down-state icon
       
    con.removeClass('textboxfacil-block-up'); //remove up-state
    con.removeClass('textboxfacil-block-all'); //remove fullscreen-state
    con.addClass('textboxfacil-block-down'); //add down-state

    icon = $('#textboxfacil-btn-al span i'); //fullscreen icon
    icon.removeClass('fa-compress-arrows-alt'); //remove compress icon
    icon.addClass('fa-expand-arrows-alt'); //add expand icon

    //save current settings
    TextBoxFacilJs.saveState();
}

TextBoxFacilJs.ConsoleLocation_Up = function()
{
    let con = $('#textboxfacil-block');
    let link = $('#textboxfacil-btn-up');
    let icon = $('#textboxfacil-btn-up span i');
    
    link.removeClass('d-none'); //if button is hidden
    icon.removeClass('fa-caret-up'); //remove down-state icon
    icon.addClass('fa-caret-down'); //add up-state icon
       
    con.removeClass('textboxfacil-block-down'); //remove down-state
    con.removeClass('textboxfacil-block-all'); //remove fullscreen-state
    con.addClass('textboxfacil-block-up'); //add up-state

    icon = $('#textboxfacil-btn-al span i'); //fullscreen icon
    icon.removeClass('fa-compress-arrows-alt'); //remove compress icon
    icon.addClass('fa-expand-arrows-alt'); //add expand icon

    //save current settings
    TextBoxFacilJs.saveState();
}

TextBoxFacilJs.ConsoleLocation_Full = function()
{
    let con = $('#textboxfacil-block');
    let link = $('#textboxfacil-btn-up');
    let icon = $('#textboxfacil-btn-up span i');
    if(con.hasClass('textboxfacil-block-all'))
        TextBoxFacilJs.ConsoleLocation_Down();
    else
    {
        link.addClass('d-none'); //if button is hidden

        con.removeClass('textboxfacil-block-up'); //remove up-state
        con.removeClass('textboxfacil-block-down'); //remove down-state
        con.addClass('textboxfacil-block-all'); //add fullscren-state

        icon = $('#textboxfacil-btn-al span i'); //fullscreen icon
        icon.removeClass('fa-expand-arrows-alt'); //remove expand icon
        icon.addClass('fa-compress-arrows-alt'); //add compress icon
    }

    //save current settings
    TextBoxFacilJs.saveState();
}

TextBoxFacilJs.ConsoleLocation_Toggle = function()
{
    let ob = $('#textboxfacil-block');
    if(ob.hasClass('textboxfacil-block-up') || ob.hasClass('textboxfacil-block-all'))
        TextBoxFacilJs.ConsoleLocation_Down();
    else
        TextBoxFacilJs.ConsoleLocation_Up();
}

TextBoxFacilJs.ConsoleOpen = function(target = null)
{
    //only open the console, when target element is a writable text element
    if(target.tagName == 'TEXTAREA' || (target.tagName == 'INPUT' && target.type == 'text'))
    {
        try{ $(document).off('focusin.modal'); } catch{ } //disable bootstrap modal block over inputs
        $('#textboxfacil-textarea').val(target.value); //copy the input text
        TextBoxFacilJs.htmlElement = target; //reference to html element
        TextBoxFacilJs.isOpen = true; //mark console how opened
        $('#textboxfacil-block').slideDown(200, function(){ $('#textboxfacil-textarea').focus(); }); //start open animation
    }
}

TextBoxFacilJs.ConsoleClose = function()
{
    let ob = TextBoxFacilJs.htmlElement;
    TextBoxFacilJs.htmlElement = null; //unlink from html element
    TextBoxFacilJs.isOpen = false; //mark console how closed
    $('#textboxfacil-block').slideUp(TextBoxFacilJs.animationms); //start close animation
    //if exist html element, set text and set focus
    if(ob != null) {
        $(ob).val($('#textboxfacil-textarea').val());
        $('#textboxfacil-textarea').val('');
        $(ob).focus();
    }
}

TextBoxFacilJs.ConsoleToggle = function(target = null)
{
    if(TextBoxFacilJs.isOpen)
        TextBoxFacilJs.ConsoleClose();
    else 
        TextBoxFacilJs.ConsoleOpen(target);
}

TextBoxFacilJs.Main = function()
{
    //Add html elements
    $("body").append(`<div id="textboxfacil-block" class="textboxfacil-block-down" style="display:none">
	<div style="display:flex; flex-flow:column; width:100%; height:100%">
        <div class="textboxfacil-block-nav">
            <div style="float:right;height:100%;display: flex;justify-content: center;align-items: center;">
                <a id="textboxfacil-btn-t1" class="textboxfacil-btn"><span class="textboxfacil-btns"><i class="fas fa-text-height fa-xs"></i></span></a>
                <a id="textboxfacil-btn-t2" class="textboxfacil-btn"><span class="textboxfacil-btns"><i class="fas fa-text-height fa-sm"></i></span></a>
                <a id="textboxfacil-btn-t3" class="textboxfacil-btn"><span class="textboxfacil-btns"><i class="fas fa-text-height"></i></span></a>
                <a id="textboxfacil-btn-up" class="textboxfacil-btn"><span class="textboxfacil-btns"><i class="fas fa-caret-up"></i></span></a>
                <a id="textboxfacil-btn-al" class="textboxfacil-btn"><span class="textboxfacil-btns"><i class="fas fa-expand-arrows-alt"></i></span></a>
                <a id="textboxfacil-btn-xx" class="textboxfacil-btn"><span class="textboxfacil-btns"><i class="fas fa-times"></i></span></a>
            </div>
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#textboxfacil-tab-ta">TextBoxFacil</a></li>
            </ul>
		</div>

		<div class="textboxfacil-tab tab-content">
			<div id="textboxfacil-tab-ta" class="tab-pane fade show active" role="tabpanel">
				<textarea id="textboxfacil-textarea" placeholder="Write/Paste your text or code here.." ></textarea>
			</div>	
		</div>
	</div>
</div>`);

    //add buttons events
    $('#textboxfacil-btn-t1').click(() => { TextBoxFacilJs.ConsoleTASize(1); });
    $('#textboxfacil-btn-t2').click(() => { TextBoxFacilJs.ConsoleTASize(2); });
    $('#textboxfacil-btn-t3').click(() => { TextBoxFacilJs.ConsoleTASize(3); });
    $('#textboxfacil-btn-up').click(() => { TextBoxFacilJs.ConsoleLocation_Toggle(); });
    $('#textboxfacil-btn-al').click(() => { TextBoxFacilJs.ConsoleLocation_Full(); });
    $('#textboxfacil-btn-xx').click(TextBoxFacilJs.ConsoleClose.bind(TextBoxFacilJs));

    //restore settings
    TextBoxFacilJs.restoreState();

    //Close console with click outside
    $(document).mouseup(function (e) {
        if(TextBoxFacilJs.isOpen)
        {
            let ob = $('#textboxfacil-block');
            //if the target of the click isn't the container nor a descendant of the container
            if (!ob.is(e.target) && ob.has(e.target).length === 0)
                TextBoxFacilJs.ConsoleClose();
        }
    });

    //Enable hotkeys
    hotkeys.filter = function(event){
        var tagName = (event.target || event.srcElement).tagName;
        hotkeys.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
        return true;
    }

    //Register hotkeys events
    hotkeys('ctrl+space', function (event, handler) { TextBoxFacilJs.ConsoleToggle(event.target || event.srcElement); });

    //destroy main function (mayhem)
    TextBoxFacilJs.Main = null;
}


//Register main function
$(document).ready(function() { TextBoxFacilJs.Main(); });
