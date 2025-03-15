local loadingScreenStarted = false

-- Function to send loading progress to NUI
local function SendLoadingProgress(progress)
    SendNUIMessage({
        eventName = "loadProgress",
        loadFraction = progress
    })
end

-- Event handler for when loading screen starts
AddEventHandler('loadingScreen:start', function()
    if not loadingScreenStarted then
        loadingScreenStarted = true
        
        -- Enable cursor
        SetNuiFocus(true, true)
        
        -- Initial progress
        SendLoadingProgress(0.0)
        
        -- Create a thread to monitor loading progress
        Citizen.CreateThread(function()
            while loadingScreenStarted do
                -- Get the current loading progress
                local progress = GetGameTimer() / (1000 * 60) -- Example: Complete in 60 seconds
                progress = math.min(progress, 1.0) -- Ensure progress doesn't exceed 100%
                
                -- Send progress to UI
                SendLoadingProgress(progress)
                
                -- If loading is complete
                if progress >= 1.0 then
                    loadingScreenStarted = false
                    break
                end
                
                Citizen.Wait(50) -- Update every 50ms
            end
        end)
    end
end)

-- Event handler for when loading screen should end
AddEventHandler('loadingScreen:stop', function()
    loadingScreenStarted = false
    SetNuiFocus(false, false)
    SendLoadingProgress(1.0)
end)

-- Register NUI callback for when the UI is ready
RegisterNUICallback('loaded', function(data, cb)
    -- Enable cursor when UI is ready
    SetNuiFocus(true, true)
    -- Trigger the start of loading progress
    TriggerEvent('loadingScreen:start')
    cb('ok')
end)

-- Register NUI callback for manual shutdown
RegisterNUICallback('shutdown', function(data, cb)
    -- Disable cursor and shut down loading screen
    SetNuiFocus(false, false)
    ShutdownLoadingScreen()
    cb('ok')
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        
        -- Check if player is spawned
        if NetworkIsPlayerActive(PlayerId()) then
            -- Shutdown loading screen
            ShutdownLoadingScreen()
            ShutdownLoadingScreenNui()
            
            -- Break the loop
            break
        end
    end
end) 