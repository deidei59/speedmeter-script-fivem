
local wasInVehicle = false

CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped, false)

        if vehicle ~= 0 and GetPedInVehicleSeat(vehicle, -1) == ped then
            wasInVehicle = true

            local speed = math.floor(GetEntitySpeed(vehicle) * 3.6 + 0.5)
            local gear = GetVehicleCurrentGear(vehicle)
            local engineOn = GetIsVehicleEngineRunning(vehicle)

            -- Nombre de places, conducteur inclus
            local maxSeats = GetVehicleModelNumberOfSeats(
                GetEntityModel(vehicle)
            )

            local occupants = 0

            -- Les sièges GTA commencent à -1 pour le conducteur.
            for seat = -1, maxSeats - 2 do
                if not IsVehicleSeatFree(vehicle, seat) then
                    occupants = occupants + 1
                end
            end

            SendNUIMessage({
                action = 'visibility',
                visible = true
            })

            SendNUIMessage({
                action = 'update',
                speed = speed,
                gear = gear == 0 and 'N' or tostring(gear),
                engine = engineOn,
                passengers = occupants,
                maxPassengers = maxSeats
            })

            Wait(100)
        else
            if wasInVehicle then
                wasInVehicle = false
            end

            SendNUIMessage({
                action = 'visibility',
                visible = false
            })

            Wait(500)
        end
    end
end)
