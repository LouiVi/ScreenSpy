function OnStart()
{
		var stream = ["Alarm", "DTMF", "Music", "Notification", "Ring", "Voicecall"];
		app.SetScreenMode( "Full" );
		app.SetOnKey( OnKey );
		for(c=0;c<stream.length;c++)
		{
			app.SetVolume( stream[c], 0 );
		}
		
		//window.localStorage.setItem("picCount", 1);
		//window.localStorage.setItem("vidCount", 1);
		//alert(window.localStorage.getItem("picCount"));
    lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
    lay.SetBackground( "Img/bk.jpg", "FillXY" );
    lay.SetOnTouch( lay_OnTouch );

    cam = app.CreateCameraView( 0.008, 0.004 );
    cam.SetOnReady( cam_OnReady );
    cam.SetVisibility( "Show");
    lay.AddChild( cam );

    btn = app.CreateButton( "Snap", 0.3, -1 );
    //btn.SetOnTouch( Snap );
    //lay.AddChild( btn );

    app.AddLayout( lay );
}

function OnKey(action , name, keycode, extrakeys)
{
//Up, VOLUME_UP, 24, 
if( action == "Up" && name == "VOLUME_UP" )
{
	SnapVideo();
}
if( action == "Up" && name == "VOLUME_DOWN" )
{
	SnapPicture();
}


//app.SetClipboardText( action + ", " + name + ", " + keycode + ", " + extrakeys );
//app.Exit( );
	//app.Alert( action + "\n" + name + "\n" + keycode, "Key Info:" );
}

function lay_OnTouch(event)
{
	if( event.action == "Up" ) app.Exit();
}

function cam_OnReady() {
    cam.SetPictureSize( 1024, 768 );
    cam.StartPreview();
    //app.ShowPopup( "Now you can start shooting" );
}

function SnapPicture()
{
		window.localStorage.setItem("picCount", parseInt(window.localStorage.getItem("picCount"))+1);
    capture = "/storage/emulated/0/Download/acapture-" + window.localStorage.getItem("picCount") + ".jpg";
   //capture = app.GetAppPath() + "/Img/acapture-" + window.localStorage.getItem("picCount") + ".jpg";
   
     //newCapture = "/sdcard/Download/ScreenSpy/capture-" + window.localStorage.getItem("picCount") + ".jpg";
    cam.TakePicture( capture );
    //app.CopyFile( capture, newCapture );
    //app.DeleteFile( capture );
    //app.ShowPopup("Picture " + capture + " saved");
}

function SnapVideo()
{
		window.localStorage.setItem("vidCount", parseInt(window.localStorage.getItem("vidCount"))+1);
    capture = "/storage/emulated/0/Download/acapture-" + window.localStorage.getItem("vidCount") + ".mp4";
    //capture = app.GetAppPath() + "/Misc/acapture-" + window.localStorage.getItem("vidCount") + ".mp4";
    
    //newCapture = "/sdcard/Download/ScreenSpy/capture-" + window.localStorage.getItem("vidCount") + ".mp4";
    cam.Record( capture );
    setTimeout(StopVideo, 5000)
    //cam.TakePicture( capture );
}

function StopVideo()
{
	cam.Stop();
	//app.CopyFile( capture, newCapture );
    //app.DeleteFile( capture );
    //app.ShowPopup("Video " + capture + " saved");
}