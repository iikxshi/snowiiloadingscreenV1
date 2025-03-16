local loadingScreenActive = true
local debugMode = true -- Enable debug mode

-- Function to get current server time
local function GetServerTime()
    local hours = GetClockHours()
    local minutes = GetClockMinutes()
    return string.format("%02d:%02d", hours, minutes)
end

-- Function to get current player count
local function GetPlayerCount()
    local playerCount = #GetActivePlayers()
    local maxPlayers = GetConvarInt('sv_maxclients', 32)
    return string.format("%d/%d", playerCount, maxPlayers)
end

-- Function to send server info to NUI
local function SendServerInfo()
    SendNUIMessage({
        type = "serverInfo",
        data = {
            playerCount = GetPlayerCount(),
            serverTime = GetServerTime()
        }
    })
end

-- Function to send loading progress to NUI
local function SendLoadingProgress(progress)
    if debugMode then
        print("[Loading Screen] Progress: " .. tostring(progress))
    end
    
    SendNUIMessage({
        type = "loadProgress",
        progress = progress
    })
end

-- Function to check if player is fully loaded
local function IsPlayerFullyLoaded()
    return NetworkIsPlayerActive(PlayerId()) and not IsLoadingPromptBeingDisplayed()
end

-- Main loading screen thread
Citizen.CreateThread(function()
    -- Initial setup
    SetNuiFocus(true, true)
    local startTime = GetGameTimer()
    local lastProgress = 0
    
    -- Main loading loop
    while loadingScreenActive do
        Citizen.Wait(100) -- Update every 100ms

        -- Send server info
        SendServerInfo()
        
        -- Calculate progress based on time and loading state
        local currentTime = GetGameTimer()
        local elapsedTime = currentTime - startTime
        local progress = math.min(elapsedTime / 15000, 0.95) -- 15 seconds max load time, cap at 95%

        -- Only send progress update if it has changed significantly
        if progress - lastProgress >= 0.01 then
            SendLoadingProgress(progress)
            lastProgress = progress
        end

        -- Check if player is fully loaded
        if NetworkIsPlayerActive(PlayerId()) then
            -- Send final 100% progress
            SendLoadingProgress(1.0)
            SendServerInfo() -- Send final server info update
            
            -- Wait a brief moment before shutting down
            Citizen.Wait(500)
            
            -- Shutdown loading screen
            if debugMode then
                print("[Loading Screen] Player fully loaded, shutting down...")
            end
            
            ShutdownLoadingScreen()
            ShutdownLoadingScreenNui()
            SetNuiFocus(false, false)
            loadingScreenActive = false
            break
        end
    end
end)

-- Handle player spawn
AddEventHandler('playerSpawned', function()
    if loadingScreenActive then
        if debugMode then
            print("[Loading Screen] Player spawned event received")
        end
        
        SendLoadingProgress(1.0)
        Citizen.Wait(500) -- Wait a brief moment before shutting down
        ShutdownLoadingScreen()
        ShutdownLoadingScreenNui()
        SetNuiFocus(false, false)
        loadingScreenActive = false
    end
end)

-- Register NUI callbacks
RegisterNUICallback('loaded', function(data, cb)
    if debugMode then
        print("[Loading Screen] UI ready callback received")
    end
    SendServerInfo() -- Send initial server info
    cb('ok')
end)

-- Register NUI callback for manual shutdown
RegisterNUICallback('shutdown', function(data, cb)
    if debugMode then
        print("[Loading Screen] Manual shutdown requested")
    end
    -- Disable cursor and shut down loading screen
    SetNuiFocus(false, false)
    ShutdownLoadingScreen()
    cb('ok')
end)

-- Enable cursor for loading screen
Citizen.CreateThread(function()
    SetNuiFocus(true, true)
end) 